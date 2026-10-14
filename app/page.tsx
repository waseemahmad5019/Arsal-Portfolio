import Hero from "@/components/sections/Hero";
import Pillars from "@/components/sections/Pillars";
import SelectedWork from "@/components/sections/SelectedWork";
import Experience from "@/components/sections/Experience";
import Connections from "@/components/sections/Connections";
import Tooling from "@/components/sections/Tooling";
import Comparison from "@/components/sections/Comparison";
import Journal from "@/components/sections/Journal";
import About from "@/components/sections/About";
import Closing from "@/components/sections/Closing";
import Contact from "@/components/sections/Contact";

/**
 * Section order mirrors the reference design: a product mock in the hero, the
 * three service tiles, the full-bleed work centrepiece, then the supporting
 * evidence — experience, the connection diagram, tooling, the comparison panel,
 * the journal, the person, the closing call to action and contact.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Pillars />
      <SelectedWork />
      <Experience />
      <Connections />
      <Tooling />
      <Comparison />
      <Journal />
      <About />
      <Closing />
      <Contact />
    </>
  );
}
