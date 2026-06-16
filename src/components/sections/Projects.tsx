"use client";

import { motion } from "framer-motion";
import { HiExternalLink } from "react-icons/hi";
import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import SectionWrapper from "@/components/ui/SectionWrapper";
import TiltCard from "@/components/ui/TiltCard";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { projects } from "@/lib/data";
import { useLanguage } from "@/hooks/useLanguage";

export default function Projects() {
  const { t } = useLanguage();

  return (
    <SectionWrapper id="projects" glow="cyan" className="relative overflow-hidden">
      <SectionHeading subtitle={t.projects.subtitle} title={t.projects.title} description={t.projects.description} />

      <ScrollReveal>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {projects.map((project, i) => {
            const pt = t.projects[project.tKey];
            return (
              <motion.div key={project.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}>
                <TiltCard className="group h-full">
                  <article className="premium-card glow-card-hover flex h-full flex-col overflow-hidden !rounded-3xl !p-0">
                    <div className="relative aspect-video overflow-hidden">
                      <Image src={project.image} alt={project.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width:768px) 100vw, 33vw" />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/40 to-transparent" />
                      <span className="absolute top-4 left-4 rounded-full border border-neon-cyan/30 bg-dark-950/70 px-3 py-1 text-xs font-medium text-neon-cyan backdrop-blur-md">{pt.category}</span>
                    </div>
                    <div className="flex flex-1 flex-col p-6 sm:p-7">
                      <h3 className="font-display text-xl font-semibold text-white group-hover:text-neon-cyan">{project.title}</h3>
                      <p className="mt-2.5 flex-1 text-sm leading-relaxed text-white/55">{pt.description}</p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span key={tag} className="tag-premium">{tag}</span>
                        ))}
                      </div>
                      <a
                        href={project.link}
                        target={project.link.startsWith("http") ? "_blank" : undefined}
                        rel={project.link.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="btn-premium mt-6 flex items-center justify-center gap-2 py-3.5 text-sm"
                      >
                        {t.projects.liveDemo}
                        <HiExternalLink size={16} />
                      </a>
                    </div>
                  </article>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </ScrollReveal>
    </SectionWrapper>
  );
}
