import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Wordmark from "./Wordmark";

const links = [
  { to: "/",       label: "Home" },
  { to: "/theme",  label: "Theme" },
  { to: "/contact",label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  const isHome = location.pathname === "/";

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Solid glass bar — always visible */}
      <div
        className={`transition-all duration-600 ${scrolled || open ? "glass-dark" : isHome ? "bg-transparent" : "glass-dark"}`}
        style={{ transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 md:px-10">
          <Link to="/" className="group text-[15px] md:text-[16px]" aria-label="TEDxThe Orbis School — home">
            <span className={`transition-opacity duration-500 group-hover:opacity-60 ${isHome && !scrolled ? "text-paper" : "text-paper"}`}>
              <Wordmark className="text-paper" />
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-9 md:flex" aria-label="Primary">
            {links.map((l) => (
              <NavLink
                key={l.to} to={l.to} end={l.to === "/"}
                className={({ isActive }) =>
                  `uline text-[13px] tracking-wide transition-colors duration-500 ${
                    isActive ? "text-white" : "text-white/55 hover:text-white"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Link
              to="/apply"
              className="border border-white/30 px-5 py-2 text-[11px] uppercase tracking-[0.26em] text-white transition-all duration-500 hover:border-tedred hover:bg-tedred"
            >
              Apply to Speak
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="flex h-8 w-8 flex-col items-end justify-center gap-[5px] md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`block h-px bg-paper transition-all duration-500 ${open ? "w-6 translate-y-[4px] rotate-45" : "w-6"}`} />
            <span className={`block h-px bg-paper transition-all duration-500 ${open ? "w-6 -translate-y-[4px] -rotate-45" : "w-4"}`} />
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id="mobile-menu" key="mobile"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden md:hidden"
            >
              <nav className="flex flex-col gap-1 px-5 pb-8 pt-4" aria-label="Mobile">
                {[...links, { to: "/apply", label: "Apply to Speak" }].map((l) => (
                  <NavLink
                    key={l.to} to={l.to} end={l.to === "/"}
                    className={({ isActive }) =>
                      `border-b border-white/10 py-4 text-2xl ${isActive ? "text-tedred" : "text-white/70"}`
                    }
                  >
                    {l.label}
                  </NavLink>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
