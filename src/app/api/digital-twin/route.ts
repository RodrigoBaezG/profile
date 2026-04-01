import { NextResponse } from "next/server";

type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

const MODEL = "qwen/qwen3.6-plus-preview:free";

// Rate limiting storage (in production, use Redis or similar)
let requestCounts = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10; // requests per minute
const RATE_WINDOW = 60 * 1000; // 1 minute in milliseconds

// Fallback responses for when API is unavailable
const FALLBACK_RESPONSES: Record<string, string> = {
  default: "I'm Rodrigo Báez García, a Junior Full Stack Software Developer based in Oxford, UK. I specialize in JavaScript, TypeScript, Angular, and Node.js. I recently completed my Full Stack Developer training at Academia X and have experience at Hillogy working on frontend features.",

  experience: "I worked as a Junior Frontend Developer at Hillogy for 1 month, building forms, sign-up and log-in pages using HTML, CSS/Bootstrap, JavaScript, and TypeScript with Angular.",

  skills: "My top skills include JavaScript, Express.js, and AngularJS. I'm proficient in full-stack development with experience in both frontend and backend technologies.",

  education: "I completed Full Stack Developer training at Academia X (Oct 2024–Nov 2025) and Full Stack Software Developer training (Aug 2024–Oct 2025). I also have Coding Practices Level 3 certification from Learning Curve.",

  contact: "You can reach me at rkbaezgarcia@gmail.com or connect with me on LinkedIn: https://www.linkedin.com/in/rodrigo-b%C3%A1ez-garc%C3%ADa-4bb55a271"
};

// Rate limiting function
function checkRateLimit(clientId: string): boolean {
  const now = Date.now();
  const clientData = requestCounts.get(clientId);

  if (!clientData || now > clientData.resetTime) {
    // Reset or initialize rate limit data
    requestCounts.set(clientId, { count: 1, resetTime: now + RATE_WINDOW });
    return true;
  }

  if (clientData.count >= RATE_LIMIT) {
    return false; // Rate limit exceeded
  }

  clientData.count++;
  return true;
}

function systemPrompt(): string {
  return [
    "You are Rodrigo Báez García's Digital Twin for a personal website.",
    "Your job is to answer questions about Rodrigo's career, skills, experience, education, and interests.",
    "",
    "Tone: professional, confident, concise. 'Enterprise meets edgy' — crisp but friendly.",
    "",
    "Hard rules:",
    "- If you don't know something, say so and suggest what info would help.",
    "- Don't invent companies, dates, or projects.",
    "- When asked for contact, share: rkbaezgarcia@gmail.com and LinkedIn.",
    "",
    "Known facts (from Rodrigo's LinkedIn PDF):",
    "- Name: Rodrigo Báez García",
    "- Role: Junior Full Stack Software Developer",
    "- Location: Oxford, England, United Kingdom",
    "- Experience: Hillogy — Junior Frontend Developer — May 2023 (1 month). Built front-end features such as forms, sign up and log in pages using HTML, CSS/Bootstrap, JavaScript, TypeScript, Angular.",
    "- Education: Academia X — Full Stack Developer (Oct 2024–Nov 2025) and Full Stack Software Developer (Aug 2024–Oct 2025).",
    "- Learning: Learning Curve — Coding Practices Level 3 (2025).",
    "- Top skills: JavaScript, Express.js, AngularJS (as listed).",
    "- LinkedIn: https://www.linkedin.com/in/rodrigo-b%C3%A1ez-garc%C3%ADa-4bb55a271",
    "",
    "Answer format guidance:",
    "- Prefer bullets for multi-part answers.",
    "- If asked 'tell me about yourself', include a 2–3 sentence elevator pitch + stack."
  ].join("\n");
}

export async function POST(req: Request) {
  // Rate limiting check
  const clientId = req.headers.get('x-forwarded-for') || 'anonymous';
  if (!checkRateLimit(clientId)) {
    return NextResponse.json(
      { error: "Rate limit exceeded. Please wait before sending more messages." },
      { status: 429 }
    );
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "Missing OPENROUTER_API_KEY. Add it to the .env file in the project root and restart the dev server."
      },
      { status: 500 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const userMessage =
    typeof (body as { message?: unknown })?.message === "string"
      ? ((body as { message: string }).message ?? "").trim()
      : "";

  const history =
    Array.isArray((body as { history?: unknown })?.history) &&
    (body as { history: unknown[] }).history.every(
      (m) =>
        m &&
        typeof m === "object" &&
        "role" in (m as object) &&
        "content" in (m as object)
    )
      ? ((body as { history: ChatMessage[] }).history ?? [])
      : [];

  if (!userMessage) {
    return NextResponse.json(
      { error: "Message cannot be empty." },
      { status: 400 }
    );
  }

  const messages: ChatMessage[] = [
    { role: "system", content: systemPrompt() },
    ...history
      .filter((m) => m.role === "user" || m.role === "assistant")
      .slice(-12),
    { role: "user", content: userMessage }
  ];

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "http://localhost:3000",
      "X-Title": "Rodrigo Baez Garcia - Digital Twin"
    },
    body: JSON.stringify({
      model: MODEL,
      messages,
      temperature: 0.5
    })
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    // Try to provide a fallback response based on the user's message
    const userMessage = userMessage.toLowerCase();
    let fallbackResponse = FALLBACK_RESPONSES.default;

    if (userMessage.includes('experience') || userMessage.includes('work') || userMessage.includes('hillogy')) {
      fallbackResponse = FALLBACK_RESPONSES.experience;
    } else if (userMessage.includes('skill') || userMessage.includes('technology') || userMessage.includes('tech')) {
      fallbackResponse = FALLBACK_RESPONSES.skills;
    } else if (userMessage.includes('education') || userMessage.includes('training') || userMessage.includes('learn')) {
      fallbackResponse = FALLBACK_RESPONSES.education;
    } else if (userMessage.includes('contact') || userMessage.includes('email') || userMessage.includes('linkedin')) {
      fallbackResponse = FALLBACK_RESPONSES.contact;
    }

    return NextResponse.json({
      reply: `${fallbackResponse}\n\n*Note: This is a fallback response. The AI service is currently unavailable. For full AI responses, please add credits to your OpenRouter account.*`
    });
  }

  const assistantText =
    (data as any)?.choices?.[0]?.message?.content ??
    (data as any)?.choices?.[0]?.text ??
    "";

  return NextResponse.json({
    reply: typeof assistantText === "string" ? assistantText : ""
  });
}

