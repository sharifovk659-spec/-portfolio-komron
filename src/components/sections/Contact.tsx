"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { HiMail, HiLocationMarker, HiPaperAirplane } from "react-icons/hi";
import SectionHeading from "@/components/ui/SectionHeading";
import SectionWrapper from "@/components/ui/SectionWrapper";
import GlassCard from "@/components/ui/GlassCard";
import { personalInfo } from "@/lib/data";
import { useLanguage } from "@/hooks/useLanguage";

export default function Contact() {
  const { t } = useLanguage();
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormState({ name: "", email: "", message: "" });
    }, 3000);
  };

  return (
    <SectionWrapper id="contact" glow="purple" className="relative">
      <SectionHeading subtitle={t.contact.subtitle} title={t.contact.title} description={t.contact.description} />

      <div className="grid gap-8 lg:grid-cols-5 lg:gap-10">
        <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-2">
          <GlassCard>
            <h3 className="font-display text-lg font-semibold gradient-text">{t.contact.info}</h3>
            <div className="mt-6 space-y-4">
              <div className="flex min-w-0 items-center gap-3 text-sm text-white/70">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-neon-blue/10"><HiMail className="text-neon-cyan" size={18} /></div>
                <span className="min-w-0 break-all">{personalInfo.email}</span>
              </div>
              <div className="flex min-w-0 items-center gap-3 text-sm text-white/70">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-neon-purple/10"><HiLocationMarker className="text-neon-purple" size={18} /></div>
                <span className="min-w-0">{personalInfo.location}</span>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-3">
          <GlassCard delay={0.2}>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm text-white/55">{t.contact.name}</label>
                  <input id="name" type="text" required value={formState.name} onChange={(e) => setFormState({ ...formState, name: e.target.value })} className="input-premium" placeholder={t.contact.placeholders.name} />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm text-white/55">{t.contact.email}</label>
                  <input id="email" type="email" required value={formState.email} onChange={(e) => setFormState({ ...formState, email: e.target.value })} className="input-premium" placeholder={t.contact.placeholders.email} />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="mb-2 block text-sm text-white/55">{t.contact.message}</label>
                <textarea id="message" required rows={5} value={formState.message} onChange={(e) => setFormState({ ...formState, message: e.target.value })} className="input-premium resize-none" placeholder={t.contact.placeholders.message} />
              </div>
              <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} disabled={submitted} className="btn-premium flex w-full items-center justify-center gap-2 py-4 disabled:opacity-70 sm:w-auto sm:px-10">
                {submitted ? t.contact.sent : <>{t.contact.send} <HiPaperAirplane size={18} /></>}
              </motion.button>
            </form>
          </GlassCard>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
