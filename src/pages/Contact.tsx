import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageShell from "../components/PageShell";
import Reveal from "../components/Reveal";
import { prettyDate, site } from "../data/site";
import { FacebookGlyph, InstagramGlyph, LinkedInGlyph, XGlyph } from "../components/SocialIcons";

const socials = [
  { href: site.instagram, label: "Instagram", handle: "", Glyph: InstagramGlyph },
  { href: site.linkedin,  label: "LinkedIn",  handle: "", Glyph: LinkedInGlyph },
  { href: site.facebook,  label: "Facebook",  handle: "",         Glyph: FacebookGlyph },
  { href: site.x,          label: "X",         handle: "",        Glyph: XGlyph },
];

function RevealLine({ label, value, note, href }: { label: string; value: string; note: string; href?: string }) {
  const [open, setOpen] = useState(false);
  const Tag = href ? "a" : "div";
  return (
    <div
      className="group border-t border-ink/12 py-8"
      onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}
    >
      <Tag
        {...(href ? { href } : {})}
        className="block focus:outline-none"
        onFocus={() => setOpen(true)} onBlur={() => setOpen(false)}
      >
        <p className="kicker mb-3">{label}</p>
        <p className="display text-[clamp(1.6rem,4vw,3rem)] leading-tight transition-colors duration-500 group-hover:text-tedred group-focus-visible:text-tedred">
          {value}
        </p>
      </Tag>
      <motion.p
        animate={{ opacity: open ? 1 : 0, height: open ? "auto" : 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden text-[14px] leading-relaxed text-graphite"
      >
        <span className="block pt-3">{note}</span>
      </motion.p>
    </div>
  );
}

export default function Contact() {
  return (
    <PageShell>
      {/* ── MASTHEAD ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-ink text-paper">
        <div className="h-1 w-full bg-tedred" />
        <div className="mx-auto max-w-[1400px] px-5 pb-16 pt-36 md:px-10 md:pb-24 md:pt-48">
          <motion.p className="kicker text-white/35" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
            Correspondence
          </motion.p>
          <motion.h1
            className="display mt-8 text-[clamp(3rem,12vw,9rem)] leading-[0.88]"
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Write to us<span className="text-tedred">.</span>
          </motion.h1>
          <motion.p
            className="mt-8 max-w-xl text-[16px] leading-relaxed text-white/50"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.35 }}
          >
            No form, no mailing list. A person reads every email. Questions about the event,
            press, partnerships, or accessibility — the fastest route is a plain message.
          </motion.p>
        </div>
        <div className="h-px w-full bg-white/10" />
      </section>

      {/* ── CONTACT INDEX ────────────────────────────────────────── */}
      <section className="bg-paper">
        <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-10 md:py-24">
          <div className="grid gap-0 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-7">
              <Reveal>
                <RevealLine
                  label="Email"
                  value={site.email}
                  href={`mailto:${site.email}`}
                  note="General enquiries, press, accessibility. Reply within three working days."
                />
              </Reveal>
              <Reveal delay={0.06}>
                <RevealLine
                  label="Telephone"
                  value={site.phone}
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                  note="School days, 09:00–16:00 IST. Outside these hours, email is quicker."
                />
              </Reveal>
              <Reveal delay={0.12}>
                <RevealLine
                  label="Speaker applications"
                  value="Use the form →"
                  note="All applications go through the Speaker Registration page so nothing is missed."
                />
              </Reveal>

              <div className="mt-8 border-t border-ink/10 pt-8">
                <Link
                  to="/apply"
                  className="group inline-flex items-center gap-4 bg-ink px-8 py-4 text-[12px] uppercase tracking-[0.28em] text-paper transition-all duration-500 hover:bg-tedred"
                >
                  Apply to Speak
                  <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </div>

            {/* Venue + socials */}
            <div className="md:col-span-5">
              <Reveal delay={0.1}>
                <div className="border border-ink/10 p-8">
                  <p className="kicker">The Venue</p>
                  <p className="mt-5 text-[18px] leading-[1.7]">{site.venue}</p>
                  <div className="rule-strong mt-7 mb-7" />
                  <dl className="space-y-3 text-[14px]">
                    {[
                      { dt: "Event", dd: site.eventName },
                      { dt: "Theme", dd: site.theme },
                      { dt: "Date",  dd: prettyDate },
                    ].map(({ dt, dd }) => (
                      <div key={dt} className="flex justify-between gap-6 border-b border-ink/8 pb-3">
                        <dt className="kicker shrink-0">{dt}</dt>
                        <dd className="text-right text-ink/70">{dd}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </Reveal>

              <Reveal delay={0.18}>
                <div className="mt-12">
                  <p className="kicker">Follow the build-up</p>
                  <ul className="mt-5">
                    {socials.map(({ href, label, handle, Glyph }) => (
                      <li key={label} className="border-t border-ink/10">
                        <a
                          href={href} target="_blank" rel="noreferrer noopener"
                          className="group flex items-center justify-between gap-4 py-4 transition-colors duration-500 hover:text-tedred"
                        >
                          <span className="flex items-center gap-4">
                            <Glyph className="h-6 w-6" />
                            <span className="text-[17px]">{label}</span>
                          </span>
                          <span className="text-[12px] tracking-[0.14em] text-graphite-soft transition-transform duration-500 group-hover:-translate-x-1">
                            {handle}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── SITE MAP ─────────────────────────────────────────────── */}
      <section className="border-t border-ink/10 bg-paper-deep">
        <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-10 md:py-20">
          <Reveal>
            <p className="kicker">Everything on this site</p>
            <ul className="mt-8 grid gap-px bg-ink/8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { to: "/",       n: "01", label: "Home",                  note: "The event, theme, team" },
                { to: "/apply",  n: "02", label: "Speaker Registration", note: "Eight steps, no fee" },
                { to: "/theme",  n: "03", label: "Theme",                note: "Six subthemes in full" },
                { to: "/contact",n: "04", label: "Contact",              note: "You are here" },
              ].map((l) => (
                <li key={l.to} className="bg-paper-deep">
                  <Link to={l.to} className="group block border-t border-ink/10 p-6">
                    <span className="text-[11px] tracking-[0.2em] text-graphite-soft">{l.n}</span>
                    <span className="mt-2 block text-[22px] transition-colors duration-500 group-hover:text-tedred">
                      {l.label}
                    </span>
                    <span className="mt-1 block text-[13px] text-graphite">{l.note}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
