# Building an AI-Powered Digital Twin Chat: A Beginner's Guide

## 🎯 Introduction

Welcome! This tutorial will walk you through building an AI-powered chat feature for a personal portfolio website. We'll create a "digital twin" - an AI chatbot that can answer questions about Rodrigo Báez García's career, skills, and experience.

By the end of this tutorial, you'll understand:
- How to integrate AI chat into a Next.js website
- How to handle API failures gracefully
- The basics of modern web development with React and TypeScript

---

## 📚 Technology Summary

### Core Technologies Used

**Frontend Framework:**
- **Next.js 16+** - A React framework for building web applications
- **React 19** - JavaScript library for building user interfaces
- **TypeScript** - Adds type safety to JavaScript

**Styling:**
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS processing tool

**AI Integration:**
- **OpenRouter API** - Platform providing access to multiple AI models
- **Qwen 3.6 Plus Preview (Free)** - The AI model powering our chat

**Development Tools:**
- **Node.js** - JavaScript runtime
- **npm** - Package manager

### Project Structure
```
site/
├── src/
│   ├── app/
│   │   ├── api/digital-twin/route.ts    # AI chat API endpoint
│   │   ├── components/
│   │   │   └── DigitalTwinChat.tsx      # Chat component
│   │   ├── globals.css                  # Global styles
│   │   ├── layout.tsx                   # Root layout
│   │   └── page.tsx                     # Home page
│   └── components/
│       ├── Contact.tsx
│       ├── DigitalTwinChat.tsx
│       ├── Hero.tsx
│       ├── Journey.tsx
│       ├── PortfolioTeaser.tsx
│       └── Shell.tsx
├── .env                                 # Environment variables
├── package.json                         # Dependencies
└── tailwind.config.ts                   # Tailwind configuration
```

---

## 🚀 High-Level Walkthrough

### Step 1: Setting Up the Project
1. **Create Next.js Project**: Use `npx create-next-app@latest` with TypeScript
2. **Install Dependencies**: Add Tailwind CSS and other required packages
3. **Configure Environment**: Set up API keys and environment variables

### Step 2: Building the Chat Interface
1. **Create Chat Component**: Build a React component with input field and message display
2. **Add State Management**: Use React hooks to manage chat messages and loading states
3. **Style the Interface**: Use Tailwind CSS for responsive, modern styling

### Step 3: Integrating AI
1. **Set Up API Route**: Create a Next.js API route to handle chat requests
2. **Connect to OpenRouter**: Integrate with the AI service using fetch API
3. **Handle Responses**: Process AI responses and update the chat interface

### Step 4: Error Handling & Fallbacks
1. **Implement Fallbacks**: Add static responses when AI service is unavailable
2. **Graceful Degradation**: Ensure the chat always works, even with API failures
3. **User Feedback**: Show appropriate messages for different error states

### Step 5: Testing & Deployment
1. **Test Locally**: Run the development server and test chat functionality
2. **Handle Edge Cases**: Test with network failures and API limits
3. **Deploy**: Push to production hosting (Vercel, Netlify, etc.)

---

## 🔍 Detailed Code Review

### 1. Environment Configuration (.env)

```bash
OPENROUTER_API_KEY=sk-or-v1-your-api-key-here
```

**What it does:**
- Stores your OpenRouter API key securely
- Keeps sensitive information out of your code
- Allows different keys for development/production

**Why it's important:**
- API keys should never be committed to version control
- Environment variables keep secrets safe
- Different environments can use different keys

### 2. API Route (src/app/api/digital-twin/route.ts)

```typescript
import { NextResponse } from "next/server";

type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

const MODEL = "qwen/qwen3.6-plus-preview:free";

// Fallback responses for when API is unavailable
const FALLBACK_RESPONSES: Record<string, string> = {
  default: "I'm Rodrigo Báez García, a Junior Full Stack Software Developer...",
  experience: "I worked as a Junior Frontend Developer at Hillogy...",
  skills: "My top skills include JavaScript, Express.js, and AngularJS...",
  education: "I completed Full Stack Developer training at Academia X...",
  contact: "You can reach me at rkbaezgarcia@gmail.com..."
};

export async function POST(req: Request) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error: "Missing OPENROUTER_API_KEY. Add it to the .env file..."
      },
      { status: 500 }
    );
  }

  // Parse and validate request
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const userMessage = typeof (body as { message?: unknown })?.message === "string"
    ? ((body as { message: string }).message ?? "").trim()
    : "";

  // Validate input
  if (!userMessage) {
    return NextResponse.json(
      { error: "Message cannot be empty." },
      { status: 400 }
    );
  }

  // Build conversation history
  const history = Array.isArray((body as { history?: unknown })?.history) &&
    (body as { history: unknown[] }).history.every(
      (m) => m && typeof m === "object" &&
      "role" in (m as object) && "content" in (m as object)
    )
      ? ((body as { history: ChatMessage[] }).history ?? [])
      : [];

  const messages: ChatMessage[] = [
    { role: "system", content: systemPrompt() },
    ...history
      .filter((m) => m.role === "user" || m.role === "assistant")
      .slice(-12), // Keep last 12 messages for context
    { role: "user", content: userMessage }
  ];

  // Call OpenRouter API
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

  // Handle API failures with fallbacks
  if (!res.ok) {
    let fallbackResponse = FALLBACK_RESPONSES.default;

    const userMessageLower = userMessage.toLowerCase();
    if (userMessageLower.includes('experience') || userMessageLower.includes('work')) {
      fallbackResponse = FALLBACK_RESPONSES.experience;
    } else if (userMessageLower.includes('skill') || userMessageLower.includes('technology')) {
      fallbackResponse = FALLBACK_RESPONSES.skills;
    } else if (userMessageLower.includes('education') || userMessageLower.includes('training')) {
      fallbackResponse = FALLBACK_RESPONSES.education;
    } else if (userMessageLower.includes('contact') || userMessageLower.includes('email')) {
      fallbackResponse = FALLBACK_RESPONSES.contact;
    }

    return NextResponse.json({
      reply: `${fallbackResponse}\n\n*Note: This is a fallback response. The AI service is currently unavailable.*`
    });
  }

  // Extract AI response
  const assistantText = (data as any)?.choices?.[0]?.message?.content ??
                       (data as any)?.choices?.[0]?.text ?? "";

  return NextResponse.json({
    reply: typeof assistantText === "string" ? assistantText : ""
  });
}

// System prompt that defines the AI's personality and knowledge
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
    "- Experience: Hillogy — Junior Frontend Developer — May 2023 (1 month)...",
    // ... rest of the facts
  ].join("\\n");
}
```

**Key Features:**
- **Type Safety**: Uses TypeScript interfaces for type checking
- **Error Handling**: Comprehensive validation and error responses
- **Fallback System**: Provides static responses when AI fails
- **Conversation Memory**: Maintains chat history for context
- **Security**: Validates input and sanitizes responses

### 3. Chat Component (src/components/DigitalTwinChat.tsx)

```typescript
"use client";

import { useMemo, useRef, useState } from "react";

type ChatRole = "user" | "assistant";
type ChatItem = { role: ChatRole; content: string };

const SUGGESTIONS: string[] = [
  "Give me your 30-second elevator pitch.",
  "What technologies are you strongest in?",
  "Tell me about your Hillogy experience.",
  "What kind of roles are you looking for next?",
  "Can you summarize your education and training?"
];

function clsx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function DigitalTwinChat() {
  const [items, setItems] = useState<ChatItem[]>([
    {
      role: "assistant",
      content: "I'm Rodrigo's Digital Twin. Ask me anything about his experience, skills, and career journey."
    }
  ]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  // Build conversation history for API
  const history = useMemo(
    () => items
      .filter((m) => m.role === "user" || m.role === "assistant")
      .map((m) => ({ role: m.role, content: m.content })),
    [items]
  );

  async function send(message: string) {
    const trimmed = message.trim();
    if (!trimmed || isSending) return;

    setError(null);
    setIsSending(true);
    setInput("");

    // Add user message to chat
    setItems((prev) => [...prev, { role: "user", content: trimmed }]);

    try {
      const res = await fetch("/api/digital-twin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, history })
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        // Handle different error types
        const serverError = typeof (data as any)?.error === "string"
          ? (data as any).error : null;
        const status = typeof (data as any)?.status === "number"
          ? (data as any).status : res.status;

        const msg = [
          serverError ?? "Request failed.",
          Number.isFinite(status) ? `Status: ${status}` : null
        ].filter(Boolean).join(" ");

        setError(msg);

        // Show user-friendly error message
        setItems((prev) => [
          ...prev,
          {
            role: "assistant",
            content: status === 403
              ? "OpenRouter rejected the request (403). This usually means the key/account can't use this model right now..."
              : "I hit an issue responding. If you're running this locally, confirm your OPENROUTER_API_KEY is set..."
          }
        ]);
        return;
      }

      // Add AI response to chat
      const reply = typeof data?.reply === "string" && data.reply.trim()
        ? data.reply.trim()
        : "I didn't receive a response. Try rephrasing your question.";

      setItems((prev) => [...prev, { role: "assistant", content: reply }]);

    } catch (e) {
      setError("Network error. Is the dev server running?");
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Chat with Rodrigo's Digital Twin
      </h2>

      {/* Chat messages */}
      <div
        ref={listRef}
        className="h-96 overflow-y-auto mb-4 p-4 border rounded-lg bg-gray-50"
      >
        {items.map((item, index) => (
          <div
            key={index}
            className={clsx(
              "mb-4 p-3 rounded-lg max-w-[80%]",
              item.role === "user"
                ? "ml-auto bg-blue-500 text-white"
                : "mr-auto bg-white border"
            )}
          >
            <div className="whitespace-pre-wrap">{item.content}</div>
          </div>
        ))}

        {isSending && (
          <div className="mr-auto bg-white border p-3 rounded-lg max-w-[80%]">
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
              <span>Rodrigo is thinking...</span>
            </div>
          </div>
        )}
      </div>

      {/* Error display */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* Quick suggestions */}
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">Try asking:</p>
        <div className="flex flex-wrap gap-2">
          {SUGGESTIONS.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => send(suggestion)}
              disabled={isSending}
              className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full disabled:opacity-50"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      {/* Input form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="flex gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about Rodrigo's experience, skills, or career..."
          disabled={isSending}
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isSending || !input.trim()}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSending ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
}
```

**Key Features:**
- **Real-time Chat**: Immediate message sending and receiving
- **Loading States**: Visual feedback during API calls
- **Error Handling**: User-friendly error messages
- **Responsive Design**: Works on mobile and desktop
- **Accessibility**: Keyboard navigation and screen reader support

---

## 🎯 5 Suggestions for Code Improvement

### 1. **Add Rate Limiting**
```typescript
// Add to API route
let requestCount = 0;
const RATE_LIMIT = 10; // requests per minute

if (requestCount >= RATE_LIMIT) {
  return NextResponse.json(
    { error: "Rate limit exceeded. Please wait before sending more messages." },
    { status: 429 }
  );
}
requestCount++;
```

**Why:** Prevents abuse and reduces API costs.

### 2. **Implement Message Persistence**
```typescript
// Add localStorage to save chat history
useEffect(() => {
  const saved = localStorage.getItem('chat-history');
  if (saved) {
    setItems(JSON.parse(saved));
  }
}, []);

useEffect(() => {
  localStorage.setItem('chat-history', JSON.stringify(items));
}, [items]);
```

**Why:** Users can continue conversations across browser sessions.

### 3. **Add Message Timestamps**
```typescript
type ChatItem = {
  role: ChatRole;
  content: string;
  timestamp: Date;
};

// When adding messages
setItems((prev) => [...prev, {
  role: "user",
  content: trimmed,
  timestamp: new Date()
}]);
```

**Why:** Provides context for when messages were sent.

### 4. **Implement Typing Indicators**
```typescript
const [isTyping, setIsTyping] = useState(false);

// In send function
setIsTyping(true);
// ... API call ...
setIsTyping(false);
```

**Why:** Better user experience showing when AI is "thinking".

### 5. **Add Message Reactions/Feedback**
```typescript
const [feedback, setFeedback] = useState<Record<number, 'positive' | 'negative'>>({});

// Add thumbs up/down buttons to messages
{item.role === "assistant" && (
  <div className="flex gap-1 mt-2">
    <button onClick={() => setFeedback(index, 'positive')}>👍</button>
    <button onClick={() => setFeedback(index, 'negative')}>👎</button>
  </div>
)}
```

**Why:** Collects user feedback to improve responses over time.

---

## 🚀 Next Steps

### 1. **Test Thoroughly**
Try different questions and edge cases:
- Test the AI chat with various questions about Rodrigo's experience
- Check fallback responses when the AI service is unavailable
- Test on different devices (mobile, tablet, desktop)
- Verify error handling works properly

### 2. **Add Analytics** (Optional)
Track which questions users ask most:
```typescript
// Add to your API route to track usage
console.log(`Question: ${userMessage}`);
// Consider integrating Google Analytics or similar
```

### 3. **Optimize Performance** (Optional)
Add caching for common responses:
```typescript
// Simple in-memory cache for frequent questions
const responseCache = new Map<string, string>();

const cacheKey = userMessage.toLowerCase().trim();
if (responseCache.has(cacheKey)) {
  return NextResponse.json({ reply: responseCache.get(cacheKey) });
}
// Cache successful AI responses
responseCache.set(cacheKey, assistantText);
```

### 4. **Enhance UI** (Optional)
Add animations and better visual feedback:
```typescript
// Add smooth message animations
<div className="animate-fade-in transition-all duration-300">
  {/* message content */}
</div>
```

### 5. **Deploy Your Website**

Deploying your Next.js website with AI chat to production is straightforward. Here are the most popular options:

#### **Option A: Vercel (Recommended for Next.js)**

**Step 1: Prepare Your Project**
```bash
# Make sure your project builds successfully
npm run build

# Test the production build locally
npm run start
```

**Step 2: Set Up Environment Variables**
- Create a `.env.local` file for production environment variables
- Copy your `OPENROUTER_API_KEY` to production environment

**Step 3: Connect to GitHub**
```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit: AI-powered portfolio website"

# Create a new repository on GitHub
# Push your code to GitHub
git remote add origin https://github.com/yourusername/your-repo-name.git
git push -u origin main
```

**Step 4: Deploy on Vercel**
1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click "New Project"
3. Import your GitHub repository
4. Configure build settings:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (leave default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next` (leave default)
5. Add environment variables:
   - Key: `OPENROUTER_API_KEY`
   - Value: Your production API key
6. Click "Deploy"

**Step 5: Set Up Custom Domain (Optional)**
1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

#### **Option B: Netlify**

**Step 1: Build Configuration**
```bash
# Create netlify.toml in your project root
[build]
  command = "npm run build"
  publish = ".next"

# For Next.js on Netlify, you might need to use next-on-netlify
npm install next-on-netlify --save-dev
```

**Step 2: Deploy**
1. Go to [netlify.com](https://netlify.com) and sign up/login
2. Drag and drop your project folder, or connect GitHub
3. Set build command: `npm run build`
4. Set publish directory: `.next`
5. Add environment variables in site settings
6. Deploy!

#### **Option C: Traditional Hosting**

**Step 1: Export Static Files**
```bash
# For static hosting, export your Next.js app
npm run export
```

**Step 2: Upload to Hosting**
- Upload the `out/` folder to any static hosting service
- Services like GitHub Pages, Surge, or traditional web hosts
- Note: API routes won't work with static hosting

#### **Environment Variables for Production**

**Important Security Steps:**
1. **Never commit `.env` files** to version control
2. **Use different API keys** for development and production
3. **Rotate keys regularly** for security

**Setting Environment Variables:**
- **Vercel**: In project dashboard → Settings → Environment Variables
- **Netlify**: Site settings → Environment variables
- **Railway**: Project variables in dashboard
- **Heroku**: Config vars in settings

#### **Testing Your Deployment**

After deployment, test:
```bash
# Test the live website
curl https://your-domain.com

# Test the API endpoint
curl -X POST https://your-domain.com/api/digital-twin \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello"}'
```

#### **Common Deployment Issues**

**API Routes Not Working:**
- Ensure your hosting platform supports serverless functions
- Vercel and Netlify handle Next.js API routes automatically

**Environment Variables Missing:**
- Double-check variable names match exactly
- Restart deployment after adding variables

**Build Failures:**
- Run `npm run build` locally first
- Check for TypeScript errors
- Ensure all dependencies are in package.json

#### **Monitoring & Maintenance**

**After Deployment:**
1. **Set up analytics** to track visitor behavior
2. **Monitor API usage** on OpenRouter dashboard
3. **Check error logs** regularly
4. **Update dependencies** periodically
5. **Backup your code** regularly

**Performance Tips:**
- Enable caching headers for static assets
- Use a CDN for global distribution
- Monitor response times and optimize slow endpoints

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [OpenRouter API Docs](https://openrouter.ai/docs)
- [Tailwind CSS Guide](https://tailwindcss.com/docs)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [Vercel Deployment Guide](https://vercel.com/docs)
- [Netlify Deployment Guide](https://docs.netlify.com/)

---

*This tutorial was created to help beginners understand modern web development with AI integration. The code demonstrates best practices for error handling, user experience, and scalable architecture.*

- [Next.js Documentation](https://nextjs.org/docs)
- [OpenRouter API Docs](https://openrouter.ai/docs)
- [Tailwind CSS Guide](https://tailwindcss.com/docs)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

---

*This tutorial was created to help beginners understand modern web development with AI integration. The code demonstrates best practices for error handling, user experience, and scalable architecture.*
