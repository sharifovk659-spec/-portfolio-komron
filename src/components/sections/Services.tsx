"use client";

import { motion } from "framer-motion";
import { HiCode, HiColorSwatch, HiDeviceMobile, HiServer, HiLightningBolt, HiSupport } from "react-icons/hi";
import SectionHeading from "@/components/ui/SectionHeading";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { services } from "@/lib/data";
import { useLanguage } from "@/hooks/useLanguage";

const iconMap = {
  code: HiCode,
  design: HiColorSwatch,
  mobile: HiDeviceMobile,
  server: HiServer,
  speed: HiLightningBolt,
  consult: HiSupport,
};

export default function Services() {
  const { t } = useLanguage();

  return (
    <SectionWrapper id="services" glow="purple" className="relative">
      <SectionHeading subtitle={t.services.subtitle} title={t.services.title} description={t.services.description} />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {services.map((service, i) => {
          const st = t.services[service.tKey];
          const Icon = iconMap[service.icon as keyof typeof iconMap];
          return (
            <motion.div key={service.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} whileHover={{ y: -8 }} className="premium-card group p-6 sm:p-7">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl text-neon-cyan" style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.15), rgba(168,85,247,0.1))" }}>
                <Icon size={26} />
              </div>
              <h3 className="font-display text-lg font-semibold text-white">{st.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/55">{st.description}</p>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
