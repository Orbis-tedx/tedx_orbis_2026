import { Link } from "react-router-dom";
import Wordmark from "./Wordmark";
import { site, prettyDate } from "../data/site";
import { FacebookGlyph, InstagramGlyph, LinkedInGlyph } from "./SocialIcons";

const socials = [
  { href: site.instagram, label: "Instagram", Glyph: InstagramGlyph },
  { href: site.linkedin,  label: "LinkedIn",  Glyph: LinkedInGlyph },
  { href: site.facebook,  label: "Facebook",  Glyph: FacebookGlyph },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink text-paper">
      <div className="mx-auto max-w-[1400px] px-5 py-14 md:px-10 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link to="/" className="text-2xl text-paper md:text-3xl">
              <Wordmark className="text-paper" />
            </Link>
            <p className="mt-4 max-w-sm text-[14px] leading-relaxed text-white/40">
              {site.theme} — {prettyDate}
              {site.venue && (
                <>
                  <br />
                  {site.venue}
                </>
              )}
            </p>
          </div>

          {/* Pages */}
          <nav className="md:col-span-3" aria-label="Footer">
            <p className="kicker text-white/30 mb-5">Pages</p>
            <ul className="space-y-2 text-[14px]">
              {[
                { to: "/",       label: "Home" },
                { to: "/apply",  label: "Speaker Registration" },
                { to: "/theme",  label: "Theme" },
                { to: "/contact",label: "Contact" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-white/45 transition-colors duration-500 hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social + email */}
          <div className="md:col-span-4">
            <p className="kicker text-white/30 mb-5">Elsewhere</p>
            <div className="flex items-center gap-5 text-white/40">
              {socials.map(({ href, label, Glyph }) => (
                <a
                  key={label} href={href} target="_blank" rel="noreferrer noopener"
                  aria-label={label}
                  className="transition-colors duration-500 hover:text-tedred"
                >
                  <Glyph className="h-6 w-6" />
                </a>
              ))}
            </div>
            <p className="mt-6 text-[14px] text-white/40">
              <a href={`mailto:${site.email}`} className="transition-colors hover:text-white">
                {site.email}
              </a>
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col gap-2 border-t border-white/10 pt-6 text-[11px] tracking-wide text-white/25 md:flex-row md:items-center md:justify-between">
          <p>{site.licenseLine}</p>
          <p>{site.credit}</p>
        </div>
      </div>
    </footer>
  );
}
