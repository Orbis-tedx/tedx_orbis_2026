import { Link } from "react-router-dom";
import PageShell from "../components/PageShell";

export default function NotFound() {
  return (
    <PageShell>
      <section className="flex min-h-[70vh] items-center bg-ink px-5 py-32 md:px-10">
        <div className="mx-auto max-w-[1400px] w-full">
          <p className="kicker text-white/30">Nothing here</p>
          <h1 className="display mt-6 text-[clamp(2.6rem,8vw,5.5rem)] text-paper">
            An ordinary dead end<span className="text-tedred">.</span>
          </h1>
          <div className="mt-8 h-px w-16 bg-tedred" />
          <p className="mt-8 max-w-lg text-[16px] leading-relaxed text-white/50">
            This address doesn't exist. The site has four pages — all one click away.
          </p>
          <div className="mt-10 flex flex-wrap gap-6 text-[14px]">
            {[
              { to: "/",       label: "Home" },
              { to: "/apply",  label: "Speaker Registration" },
              { to: "/theme",  label: "Theme" },
              { to: "/contact",label: "Contact" },
            ].map((l) => (
              <Link key={l.to} to={l.to} className="text-white/35 transition-colors hover:text-tedred">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
