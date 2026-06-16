import Hero from "@/components/sections/Hero";
import Statistics from "@/components/sections/Statistics";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Services from "@/components/sections/Services";
import WorkProcess from "@/components/sections/WorkProcess";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Statistics />
      <About />
      <Skills />
      <Projects />
      <Services />
      <WorkProcess />
      <Testimonials />
      <Contact />
    </>
  );
}
