import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import PageShell from "../components/PageShell";
import Reveal from "../components/Reveal";
import { subthemes } from "../data/subthemes";

function PlusIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" aria-hidden="true">
      <line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="1.5" />
      <line
        x1="12" y1="2" x2="12" y2="22"
        stroke="currentColor"
        strokeWidth="1.5"
        style={{
          transform: open ? "rotate(90deg) scaleY(0)" : "rotate(0deg) scaleY(1)",
          transformOrigin: "center",
          transition: "transform 0.55s cubic-bezier(0.16,1,0.3,1)",
        }}
      />
    </svg>
  );
}

export default function ThemePage() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <PageShell>
      {/* ── HERO ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-ink text-paper">
        <div className="h-1 w-full bg-tedred" />

        <div className="mx-auto max-w-[1400px] px-5 pb-20 pt-36 md:px-10 md:pb-28 md:pt-52">
          <motion.p
            className="kicker text-white/35"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9 }}
          >
            TEDxThe Orbis School — 2026
          </motion.p>

          <h1 className="display mt-10 text-[clamp(4rem,16vw,13rem)] leading-[0.87] tracking-[-0.03em]">
            {["The", "Extra", "in the", "Ordinary"].map((word, i) => (
              <motion.span
                key={word}
                className={`block ${i === 0 ? "text-paper" : ""} ${
                  i === 1 ? "ml-[clamp(2rem,8vw,7rem)] text-tedred" : ""
                } ${i === 2 ? "text-[0.38em] not-italic tracking-[0.07em] text-white/40" : ""} ${
                  i === 3 ? "italic text-white/70" : ""
                }`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, delay: 0.1 * i + 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.div
            className="mt-12 flex flex-col items-start gap-6 sm:mt-16 sm:flex-row sm:flex-wrap sm:items-center sm:gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <div className="h-px w-16 bg-tedred" />
            <p className="text-[15px] text-white/45">
              Six subthemes. Six angles on one quiet question.
            </p>
            <Link
              to="/apply"
              className="border border-white/20 px-6 py-2.5 text-[11px] uppercase tracking-[0.26em] text-white/70 transition-all duration-500 hover:border-tedred hover:bg-tedred hover:text-white sm:ml-auto"
            >
              Apply to Speak
            </Link>
          </motion.div>
        </div>

        <div className="h-px w-full bg-white/10" />
      </section>

      {/* ── INTRO ────────────────────────────────────────────────── */}
      <section className="bg-paper">
        <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <Reveal>
                <p className="kicker">The argument</p>
              </Reveal>
            </div>
            <div className="md:col-span-7">
              <Reveal delay={0.08}>
                <p className="display text-[clamp(1.6rem,3.5vw,2.8rem)] leading-[1.2] tracking-[-0.01em]">
                  Extraordinary things announce themselves. Ordinary things do not — they simply
                  accumulate, unnoticed, until they turn out to have been the whole story.
                </p>
              </Reveal>
              <Reveal delay={0.14}>
                <div className="rule-strong mt-8" />
                <p className="mt-8 text-[16px] leading-[1.8] text-graphite">
                  Every subtheme here is a door into the same room, approached from a different wall.
                  All of them ask: what extraordinary thing is hiding inside the thing you have already
                  decided is not worth a second look?
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── ACCORDION ────────────────────────────────────────────── */}
      <section className="bg-ink">
        <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-10 md:py-20">
          <ul className="border-t border-white/12">
            {subthemes.map((s) => {
              const open = openId === s.id;
              return (
                <li key={s.id} className="border-b border-white/12">
                  <h2>
                    <button
                      type="button"
                      onClick={() => setOpenId(open ? null : s.id)}
                      aria-expanded={open}
                      aria-controls={`panel-${s.id}`}
                      id={`accordion-${s.id}`}
                      className="group flex w-full items-start gap-6 py-8 text-left md:gap-10 md:py-10"
                    >
                      <span className="w-10 shrink-0 pt-1 text-[12px] tracking-[0.2em] text-white/25">
                        {s.index}
                      </span>
                      <span
                        className={`display flex-1 text-[clamp(1.5rem,4vw,2.9rem)] leading-[1.08] transition-colors duration-500 ${
                          open ? "text-tedred" : "text-paper group-hover:text-white/80"
                        }`}
                      >
                        {s.title}
                      </span>
                      <span
                        className={`mt-2 shrink-0 transition-colors duration-500 ${open ? "text-tedred" : "text-white/30 group-hover:text-white/60"}`}
                      >
                        <PlusIcon open={open} />
                      </span>
                    </button>
                  </h2>

                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        key={`panel-${s.id}`}
                        id={`panel-${s.id}`}
                        role="region"
                        aria-labelledby={`accordion-${s.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ height: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }, opacity: { duration: 0.4 } }}
                        className="overflow-hidden"
                      >
                        <div className="pb-12 md:pl-[72px]">
                          <div className="max-w-3xl">
                            <p className="text-[clamp(1rem,1.5vw,1.2rem)] leading-[1.75] text-white/80">
                              {s.body}
                            </p>
                            <p className="mt-6 text-[15px] italic text-white/40">— {s.teaser}</p>
                            <div className="mt-8 flex flex-wrap items-center gap-6">
                              <Link
                                to="/apply"
                                className="border border-white/30 px-6 py-2.5 text-[11px] uppercase tracking-[0.26em] text-white/70 transition-all duration-500 hover:border-tedred hover:bg-tedred hover:text-white"
                              >
                                Apply with this subtheme
                              </Link>
                              <button
                                type="button"
                                onClick={() => setOpenId(null)}
                                className="text-[13px] text-white/25 transition-colors hover:text-white/50"
                              >
                                Close ↑
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ── NOTE ──────────────────────────────────────────────────── */}
      <section className="bg-paper border-t border-ink/10">
        <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
          <Reveal>
            <div className="grid gap-10 md:grid-cols-12">
              <div className="md:col-span-1">
                <span className="text-[72px] font-light leading-none text-ink/10">→</span>
              </div>
              <div className="md:col-span-10 md:col-start-2">
                <p className="kicker mb-6">A note on choosing</p>
                <p className="display text-[clamp(1.5rem,3.5vw,2.8rem)] leading-[1.2] tracking-[-0.01em]">
                  Do not pick the subtheme that sounds most impressive. Pick the one you have already
                  been thinking about, quietly, for a while.
                </p>
                <div className="rule-strong mt-10" />
                <div className="mt-8">
                  <Link
                    to="/apply"
                    className="group inline-flex items-center gap-4 bg-ink px-8 py-4 text-[12px] uppercase tracking-[0.28em] text-paper transition-all duration-500 hover:bg-tedred"
                  >
                    Apply to Speak
                    <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
