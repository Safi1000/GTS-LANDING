import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { Hero } from "@/components/home/Hero";
import {
  Anatomy, Faq, HomeCta, HowItWorks, IndicatorSection, MasterclassSection, Partners, ResultsSection, Rooms,
  TerminalSection, Trust, Voices,
} from "@/components/home/Sections";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: SITE.title },
  alternates: { canonical: "/" },
};

/** Home. A server component; client islands only own motion and interaction. */
export default function Home() {
  return (
    <Reveal>
      <Hero />
      <Trust />
      <Anatomy />
      <Rooms />
      <HowItWorks />
      <IndicatorSection />
      <MasterclassSection />
      <ResultsSection />
      <TerminalSection />
      <Partners />
      <Voices />
      <Faq />
      <HomeCta />
    </Reveal>
  );
}
