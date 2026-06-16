"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectCreative } from "swiper/modules";
import { HiStar, HiChevronLeft, HiChevronRight } from "react-icons/hi";
import SectionHeading from "@/components/ui/SectionHeading";
import SectionWrapper from "@/components/ui/SectionWrapper";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { testimonials } from "@/lib/data";
import { useLanguage } from "@/hooks/useLanguage";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-creative";

export default function Testimonials() {
  const { t } = useLanguage();

  return (
    <SectionWrapper id="testimonials" glow="purple" className="relative">
      <SectionHeading subtitle={t.testimonials.subtitle} title={t.testimonials.title} description={t.testimonials.description} />

      <ScrollReveal>
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectCreative]}
            effect="creative"
            creativeEffect={{ prev: { translate: ["-120%", 0, -400], opacity: 0 }, next: { translate: ["120%", 0, -400], opacity: 0 } }}
            slidesPerView={1}
            speed={700}
            autoplay={{ delay: 5500, disableOnInteraction: false, pauseOnMouseEnter: true }}
            pagination={{ clickable: true, dynamicBullets: true }}
            navigation={{ prevEl: ".testimonial-prev", nextEl: ".testimonial-next" }}
            className="testimonials-swiper !pb-16"
          >
            {testimonials.map((item, i) => {
              const tt = t.testimonials.items[i];
              return (
                <SwiperSlide key={item.id}>
                  <div className="premium-card glow-card-hover mx-auto max-w-3xl p-8 text-center sm:p-12">
                    <div className="mb-6 flex justify-center gap-1">
                      {Array.from({ length: item.rating }).map((_, j) => (
                        <HiStar key={j} className="text-neon-cyan" size={20} />
                      ))}
                    </div>
                    <p className="text-lg leading-relaxed text-white/75 italic sm:text-xl">&ldquo;{tt.text}&rdquo;</p>
                    <div className="mt-8 border-t border-white/10 pt-6">
                      <p className="font-display text-lg font-semibold">{item.name}</p>
                      <p className="mt-1 text-sm text-neon-purple">{tt.role}</p>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
          <button aria-label={t.testimonials.prev} className="testimonial-prev premium-card absolute top-1/2 left-0 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center !p-0 text-neon-cyan sm:flex">
            <HiChevronLeft size={22} />
          </button>
          <button aria-label={t.testimonials.next} className="testimonial-next premium-card absolute top-1/2 right-0 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center !p-0 text-neon-cyan sm:flex">
            <HiChevronRight size={22} />
          </button>
        </div>
      </ScrollReveal>
    </SectionWrapper>
  );
}
