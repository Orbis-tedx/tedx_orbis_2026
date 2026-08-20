import { Link } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import PageShell from "../components/PageShell";
import Reveal from "../components/Reveal";
import HeroMascot from "../components/HeroMascot";
import Wordmark from "../components/Wordmark";
import { subthemes } from "../data/subthemes";
import { prettyDate, site } from "../data/site";

 

function Countdown({ target }: { target: string }) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(id);
  }, []);
  const t = new Date(target).getTime();
  if (Number.isNaN(t)) return null;
  const diff = Math.max(0, t - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  if (diff === 0) return <div className="text-tedred">Event day</div>;

  const Box = ({ value, label }: { value: string; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="flex h-24 w-full items-center justify-center rounded-xl border border-tedred/60 bg-ink shadow-[inset_0_-10px_20px_rgba(0,0,0,0.6)] md:h-32 lg:h-36">
        <span className="text-4xl font-extrabold tracking-tight text-paper md:text-5xl lg:text-6xl">{value}</span>
      </div>
      <div className="mt-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink/70 md:text-[12px]">{label}</div>
    </div>
  );

  return (
    <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
      <Box value={String(days).padStart(2, "0")} label="Days" />
      <Box value={String(hours).padStart(2, "0")} label="Hours" />
      <Box value={String(minutes).padStart(2, "0")} label="Minutes" />
      <Box value={String(seconds).padStart(2, "0")} label="Seconds" />
    </div>
  );
}

export default function Home() {
  const reduced = useReducedMotion();
  const narrativeRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: narrativeRef,
    offset: ["start end", "end start"],
  });
  const drift = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["4%", "-4%"]);

  return (
    <PageShell>
      {/* ── HERO ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-ink text-paper">
        {/* Top accent bar */}
        <div className="h-1 w-full bg-tedred" />

        <div className="mx-auto grid max-w-[1400px] gap-0 px-5 pb-0 pt-32 md:grid-cols-12 md:px-10 md:pt-44 lg:pt-48">
          {/* Left: text column */}
          <div className="md:col-span-7 md:pr-12">
            <motion.p
              className="kicker text-paper/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.1 }}
            >
              TEDxThe Orbis School — independently organized
            </motion.p>

            <motion.h1
              className="display mt-6 text-[clamp(3.2rem,10vw,8rem)] text-paper"
              initial={{ opacity: 0, y: reduced ? 0 : 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              The Extra
              <br />
              <span className="italic text-paper/70">in the</span>
              <br />
              Ordinary
              <span className="text-tedred">.</span>
            </motion.h1>

            {/* Rule */}
            <motion.div
              className="mt-10 h-px w-16 bg-tedred"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />

            <motion.div
              className="mt-10 max-w-lg"
              initial={{ opacity: 0, y: reduced ? 0 : 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-[18px] leading-[1.8] text-paper/75">
                An afternoon of talks given over entirely to the things we walk past — and to the
                argument that none of them are as small as they look.
              </p>

              <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-white/10 pt-7 text-[14px]">
                <div>
                  <dt className="kicker mb-2 text-white/35">When</dt>
                  <dd className="text-paper/90">{prettyDate}</dd>
                </div>
                <div>
                  <dt className="kicker mb-2 text-white/35">City</dt>
                  <dd className="text-paper/90">Pune, India</dd>
                </div>
              </dl>

              <div className="mt-10 flex flex-wrap items-center gap-5">
                <Link
                  to="/apply"
                  className="group inline-flex items-center gap-4 bg-paper px-8 py-4 text-[12px] uppercase tracking-[0.28em] text-ink transition-all duration-500 hover:bg-tedred hover:text-paper"
                >
                  Apply to Speak
                  <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
                </Link>
                <Link
                  to="/theme"
                  className="text-[14px] text-paper/50 transition-colors duration-500 hover:text-paper"
                >
                  Explore the theme →
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Right: 3D bulb */}
          <motion.div
            className="relative md:col-span-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.6, delay: 0.5 }}
          >
            {/* Dark gradient behind bulb */}
            <div className="pointer-events-none absolute inset-0 -z-10 mx-auto my-auto h-[70%] w-[70%] rounded-full bg-[radial-gradient(circle,rgba(230,43,30,0.15),transparent_65%)] blur-2xl" />
            <div className="flex h-[360px] items-end justify-center sm:h-[440px] md:h-[580px] md:items-center">
              <HeroMascot />
            </div>
          </motion.div>
        </div>

        {/* Bottom accent bar */}
        <div className="h-px w-full bg-white/10" />
      </section>

      {/* ── COUNTDOWN ────────────────────────────────────────────── */}
      <section className="border-b border-ink/10 bg-paper-deep">
        <div className="mx-auto max-w-[1400px] px-5 py-14 sm:py-16 md:px-10 md:py-24">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-12">
            <div className="max-w-xl">
              <p className="kicker">The moment is approaching</p>
              <h2 className="display mt-4 text-[clamp(2rem,5vw,4rem)] leading-[0.95]">
                Time until the event<span className="text-tedred">.</span>
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-graphite">
                {prettyDate} · Pune, India
              </p>
            </div>
            <div className="w-full md:max-w-2xl">
              {(() => {
                const target = new Date(site.eventDate);
                return Number.isNaN(target.getTime()) ? null : <Countdown target={site.eventDate} />;
              })()}
            </div>
          </div>
        </div>
      </section>

      {/* ── THEME STATEMENT ────────────────────────────────────────── */}
      <section className="bg-paper">
        <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-36">
          <div className="grid gap-14 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-1">
              <Reveal>
                <span className="text-[80px] font-light leading-none text-ink/10">01</span>
              </Reveal>
            </div>
            <div className="md:col-span-10 md:col-start-2">
              <Reveal>
                <p className="kicker mb-8">The Theme</p>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="display text-[clamp(2rem,4.5vw,4rem)] leading-[1.08] tracking-[-0.015em]">
                  We are unusually good at noticing the exceptional and{" "}
                  <span className="text-tedred underline decoration-1 underline-offset-4">
                    almost blind
                  </span>{" "}
                  to everything else. This year we are turning the telescope around.
                </p>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="rule-strong mt-10" />
                <p className="mt-8 max-w-2xl text-[17px] leading-[1.8] text-graphite">
                  Six subthemes. Six angles on the same quiet question: what extraordinary thing is
                  hiding inside the thing you have already decided is ordinary?
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── SUBTHEMES ─────────────────────────────────────────────── */}
      <section ref={narrativeRef} className="bg-ink text-paper">
        <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
          <Reveal>
            <div className="flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
              <h2 className="display text-[clamp(2rem,5vw,3.8rem)] text-paper">Six ways in</h2>
              <Link
                to="/theme"
                className="text-[14px] text-white/40 transition-colors duration-500 hover:text-paper"
              >
                Read all six →
              </Link>
            </div>
          </Reveal>

          <motion.ol style={{ y: drift }} className="mt-2 grid gap-0">
            {subthemes.map((s, i) => (
              <Reveal key={s.id} delay={(i % 2) * 0.06}>
                <li className="group border-b border-white/10">
                  <Link
                    to="/theme"
                    className="flex items-start gap-6 py-8 md:gap-12 md:py-10"
                  >
                    <span className="w-10 shrink-0 pt-1 text-[13px] tracking-[0.2em] text-white/25">
                      {s.index}
                    </span>
                    <div className="flex-1">
                      <h3 className="display text-[clamp(1.5rem,3vw,2.4rem)] leading-[1.1] text-paper transition-colors duration-500 group-hover:text-tedred">
                        {s.title}
                      </h3>
                      <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white/50">
                        {s.teaser}
                      </p>
                    </div>
                    <span className="mt-3 shrink-0 text-white/20 transition-all duration-500 group-hover:translate-x-1 group-hover:text-tedred">
                      →
                    </span>
                  </Link>
                </li>
              </Reveal>
            ))}
          </motion.ol>
        </div>
      </section>

      {/* ── WHAT IS TEDx ───────────────────────────────────────────── */}
      <section className="bg-paper">
        <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-36">
          <div className="grid gap-14 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-1">
              <Reveal>
                <span className="text-[80px] font-light leading-none text-ink/10">02</span>
              </Reveal>
            </div>
            <div className="md:col-span-10 md:col-start-2">
              <Reveal>
                <p className="kicker mb-8">The Programme</p>
                <h2 className="display text-[clamp(2rem,4.5vw,3.6rem)]">
                  What is TED<span className="text-tedred">x</span>?
                </h2>
              </Reveal>
              <Reveal delay={0.08}>
                <div className="rule-strong mt-10 mb-10" />
                <div className="max-w-2xl">
                  <p className="text-[17px] leading-[1.85] text-graphite">
                    In the spirit of discovering and spreading ideas, TED has created a program called{" "}
                    <a
                      href={site.tedxProgramUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-tedred underline decoration-1 underline-offset-2 transition-colors hover:text-ink"
                    >
                      TEDx
                    </a>
                    . TEDx is a program of local, self-organized events that bring people together to
                    share a TED-like experience. Our event is called TEDxThe Orbis School, where x =
                    independently organized TED event. At our TEDxThe Orbis School event, TED Talks
                    video and live speakers will combine to spark deep discussion and connection in a
                    small group. Speakers never pay to join a TEDx event. Consideration, speaker
                    coaching and event participation along with attendance are all provided free of
                    charge. The TED Conference provides general guidance for the TEDx program, but
                    individual TEDx events, including ours, are self-organized.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── CLOSING CTA ───────────────────────────────────────────── */}
      <section className="bg-ink text-paper">
        <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-36">
          <div className="grid gap-14 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-7">
              <Reveal>
                <p className="kicker text-white/40">Speaker applications are open</p>
                <h2 className="display mt-6 text-[clamp(2.4rem,6vw,5rem)] text-paper">
                  You have an ordinary idea.
                  <br />
                  <span className="italic text-white/60">Bring it.</span>
                </h2>
                <div className="rule mt-10 w-24 bg-tedred" />
                <p className="mt-8 max-w-md text-[16px] leading-relaxed text-white/55">
                  No application fee. The only requirement: an idea you genuinely care about.
                </p>
              </Reveal>
            </div>
            <div className="flex items-end md:col-span-5">
              <Reveal delay={0.12}>
                <Link
                  to="/apply"
                  className="group inline-flex items-center gap-5 border-2 border-paper px-10 py-5 text-[13px] uppercase tracking-[0.28em] text-paper transition-all duration-500 hover:border-tedred hover:bg-tedred"
                >
                  Apply to Speak
                  <span className="transition-transform duration-500 group-hover:translate-x-2">→</span>
                </Link>
                <div className="mt-8">
                  <Link
                    to="/theme"
                    className="text-[14px] text-white/35 transition-colors duration-500 hover:text-white"
                  >
                    Read the six subthemes
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
          <div className="rule mt-20 border-white/10" />
          <p className="mt-6 text-[12px] text-white/25">
            <Wordmark className="mr-2" /> {site.licenseLine}
          </p>
        </div>
      </section>
    </PageShell>
  );
}
