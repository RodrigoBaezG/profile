import { Contact } from "@/components/Contact";
import { DigitalTwinChat } from "@/components/DigitalTwinChat";
import { Hero } from "@/components/Hero";
import { Journey } from "@/components/Journey";
import { PortfolioTeaser } from "@/components/PortfolioTeaser";
import { PageShell } from "@/components/Shell";

export default function HomePage() {
  return (
    <PageShell>
      <Hero />
      <Journey />
      <PortfolioTeaser />
      <DigitalTwinChat />
      <Contact />
    </PageShell>
  );
}

