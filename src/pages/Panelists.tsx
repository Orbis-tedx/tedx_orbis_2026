import { motion } from "framer-motion";
import PageShell from "../components/PageShell";
import Reveal from "../components/Reveal";
import reevaImage from "../image_assets/panelists/reeva_mam.jpeg";
import ritikaImage from "../image_assets/panelists/ritika_narang_mam.jpeg";

const panelists = [
  {
    name: "Ms. Reeva",
    role: "Panelist",
    image: reevaImage,
    imageAlt: "Ms. Reeva at a Model United Nations conference",
    paragraphs: [
      "With years of experience in Model United Nations, public speaking, debate, and diplomacy, Reeva is a confident and compelling communicator with a sharp eye for detail and a strong command of the room. Her MUN journey has shaped her ability to think critically, articulate ideas with conviction, and engage with diverse perspectives.",
      "Beyond the world of debate, Reeva has a distinct eye for fashion, personal style, and self-expression, viewing fashion as both an art and a statement of individuality. A law student with a dynamic and multifaceted perspective, she brings together intellect, confidence, culture, and style with a voice that is difficult to overlook.",
    ],
  },
  {
    name: "Ms. Ritika Narang",
    role: "Panelist",
    image: ritikaImage,
    imageAlt: "Ms. Ritika Narang smiling at a cultural event",
    paragraphs: [
      "Ritika Narang is a creative entrepreneur, storyteller and curator based in Pune. She is the founder of Either Or, an iconic lifestyle store that has been a distinctive part of Pune’s cultural and lifestyle landscape for over 27 years, bringing together craft, design, culture and conscious living.",
      "For Ritika, Either Or has always been more than a store… it is a way of looking at the world. Her work is driven by curiosity, an appreciation for Indian craft and culture, and a belief that commerce can coexist with conscience, creativity and kindness.",
      "She enjoys finding fresh stories in familiar things… connecting the past with the present, and turning everyday ideas into thoughtful experiences.",
      "At heart, she is a collector of stories, ideas and beautiful little contradictions.",
    ],
  },
];

export default function Panelists() {
  return (
    <PageShell>
      <section className="relative overflow-hidden bg-ink text-paper">
        <div className="h-1 w-full bg-tedred" />
        <div className="mx-auto max-w-[1400px] px-5 pb-16 pt-36 md:px-10 md:pb-24 md:pt-48">
          <motion.p
            className="kicker text-white/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            The selection panel
          </motion.p>
          <motion.h1
            className="display mt-8 max-w-5xl text-[clamp(3rem,10vw,8rem)] leading-[0.9]"
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            A good idea deserves a good listener<span className="text-tedred">.</span>
          </motion.h1>
          <motion.p
            className="mt-8 max-w-2xl text-[16px] leading-relaxed text-white/55 md:text-[18px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Meet the thoughtful voices choosing the speakers who will bring this year’s ideas to the stage.
          </motion.p>
        </div>
        <div className="h-px w-full bg-white/10" />
      </section>

      <section className="bg-paper" aria-label="Meet the panelists">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          {panelists.map((panelist, index) => (
            <article
              key={panelist.name}
              className="grid gap-8 border-b border-ink/10 py-14 md:grid-cols-12 md:items-center md:gap-12 md:py-24"
            >
              <Reveal className={`md:col-span-5 ${index % 2 === 1 ? "md:order-2" : ""}`}>
                <figure className="relative mx-auto max-w-[480px] overflow-hidden bg-paper-deep md:max-w-none">
                  <img
                    src={panelist.image}
                    alt={panelist.imageAlt}
                    className="aspect-[4/5] w-full object-cover object-center md:aspect-[3/4]"
                    loading={index === 0 ? "eager" : "lazy"}
                    decoding="async"
                  />
                  <figcaption className="absolute bottom-0 left-0 bg-ink px-4 py-3 text-[10px] uppercase tracking-[0.24em] text-white/75">
                    Selection panel · 0{index + 1}
                  </figcaption>
                </figure>
              </Reveal>

              <Reveal className={`md:col-span-7 ${index % 2 === 1 ? "md:order-1" : ""}`} delay={0.1}>
                <div className="max-w-2xl py-2 md:mx-auto">
                  <p className="kicker">{panelist.role} · 0{index + 1}</p>
                  <h2 className="display mt-5 text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95]">
                    {panelist.name}<span className="text-tedred">.</span>
                  </h2>
                  <div className="rule-strong my-8 max-w-20" />
                  <div className="space-y-5 text-[15px] leading-[1.85] text-graphite md:text-[16px]">
                    {panelist.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </Reveal>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}