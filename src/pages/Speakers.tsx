import { motion } from "framer-motion";
import PageShell from "../components/PageShell";
import Reveal from "../components/Reveal";
import lineupOneImage from "../image_assets/speakers/speakers2.jpeg";
import lineupTwoImage from "../image_assets/speakers/Speakers1.jpeg";

const lineups = [
  {
    label: "The first lineup",
    image: lineupOneImage,
    imageAlt: "Speaker poster featuring the first nine TEDxThe Orbis School finalists",
    speakers: [
      "Divyansh Bohra",
      "Armaan Ali Raj",
      "Agraja Shelke",
      "Shraddha Pagire",
      "Dhruv Bhat",
      "Anika Desai",
      "Arham Sanghavi",
      "Sarah Dhariwala",
      "Sarah Sony",
    ],
  },
  {
    label: "The second lineup",
    image: lineupTwoImage,
    imageAlt: "Speaker poster featuring the next nine TEDxThe Orbis School finalists",
    speakers: [
      "Sahasra Samayamantri",
      "Savi Bogewar",
      "Athrava Nema",
      "Shaima Pathan",
      "Atharva Arora",
      "Shourya Daga",
      "Chaitanya Saini",
      "Saachi Thadhani",
      "Tanmay Bhardwaj",
    ],
  },
];

export default function Speakers() {
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
            The voices taking the stage
          </motion.p>
          <motion.h1
            className="display mt-8 max-w-5xl text-[clamp(3.5rem,11vw,9rem)] leading-[0.88]"
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Meet our
            <br />
            speakers<span className="text-tedred">.</span>
          </motion.h1>
          <motion.p
            className="mt-8 max-w-2xl text-[16px] leading-relaxed text-white/55 md:text-[18px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Eighteen young voices, each with an idea worth sharing. Get to know the finalists bringing their
            perspectives to the TEDxThe Orbis School stage.
          </motion.p>
          <div className="mt-10 flex items-center gap-4 text-[11px] uppercase tracking-[0.24em] text-white/45">
            <span className="h-px w-10 bg-tedred" />
            Two lineups · eighteen speakers
          </div>
        </div>
        <div className="h-px w-full bg-white/10" />
      </section>

      <section className="bg-paper" aria-label="Meet the speakers">
        <div className="mx-auto max-w-[1400px] px-5 py-8 md:px-10 md:py-12">
          {lineups.map((lineup, lineupIndex) => (
            <article
              key={lineup.label}
              className="grid gap-8 border-b border-ink/10 py-12 md:grid-cols-12 md:items-center md:gap-12 md:py-20"
            >
              <Reveal className={`md:col-span-5 ${lineupIndex % 2 === 1 ? "md:order-2" : ""}`}>
                <a
                  href={lineup.image}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open ${lineup.label.toLowerCase()} poster at full size`}
                  className="group block overflow-hidden border border-ink/10 bg-white p-2 shadow-[0_24px_60px_rgba(15,14,13,0.12)]"
                >
                  <img
                    src={lineup.image}
                    alt={lineup.imageAlt}
                    className="block h-auto w-full transition-transform duration-700 group-hover:scale-[1.015]"
                    loading={lineupIndex === 0 ? "eager" : "lazy"}
                    decoding="async"
                  />
                </a>
                <p className="mt-4 text-[10px] uppercase tracking-[0.2em] text-graphite-soft">
                  Select the poster to view it full size
                </p>
              </Reveal>

              <Reveal className={`md:col-span-7 ${lineupIndex % 2 === 1 ? "md:order-1" : ""}`} delay={0.1}>
                <div className="max-w-2xl py-2 md:mx-auto">
                  <p className="kicker">The speaker lineup · 0{lineupIndex + 1}</p>
                  <h2 className="display mt-5 text-[clamp(2.5rem,6vw,5rem)] leading-[0.95]">
                    {lineup.label}<span className="text-tedred">.</span>
                  </h2>
                  <div className="rule-strong my-8 max-w-20" />
                  <ol className="grid gap-x-8 sm:grid-cols-2">
                    {lineup.speakers.map((speaker, speakerIndex) => (
                      <li
                        key={speaker}
                        className="flex items-baseline gap-4 border-b border-ink/10 py-3"
                      >
                        <span className="kicker shrink-0 text-graphite-soft">
                          {String(speakerIndex + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[15px] leading-snug text-ink md:text-[16px]">{speaker}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </Reveal>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
