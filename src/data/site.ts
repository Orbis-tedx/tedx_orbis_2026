/**
 * Site-wide configuration read from Vite env vars, with safe fallbacks so
 * the site never crashes (or renders "undefined") when a var is unset.
 * See .env.example for the full list.
 */
const env = import.meta.env as Record<string, string | undefined>;

const val = (key: string, fallback: string) => {
  const v = env[key];
  return v && v.trim().length > 0 ? v.trim() : fallback;
};

export const site = {
  eventName: "TEDxThe Orbis School",
  theme: "The Extra in the Ordinary",
  venue: val("VITE_VENUE", "updating soon !!"),
  address: ["The Orbis School", "Keshav Nagar, Mundhwa", "Pune, Maharashtra 411036", "India"],
  eventDate: val("VITE_EVENT_DATE", "2026-10-17"),
  email: val("VITE_CONTACT_EMAIL", "tedx@theorbisschool.com"),
  phone: val("VITE_CONTACT_PHONE", "+919175080548"),
  instagram: val("VITE_INSTAGRAM_URL", "https://www.instagram.com/theorbisschools/"),
  linkedin: val("VITE_LINKEDIN_URL", "https://www.linkedin.com/school/the-orbis-school-pune/posts/?feedView=all"),
  facebook: val("VITE_FACEBOOK_URL", "https://www.facebook.com/theorbisschool/"),
  x: val("VITE_X_URL", ""),
  sheetsEndpoint: val("VITE_GOOGLE_SHEETS_WEB_APP_URL", "https://script.google.com/a/macros/theorbisschool.com/s/AKfycbzsT9fLLwI5OoRghd5hyeoLTbTPf3M4JNnNGO-WSGV1mLBZzPnlpf5pzfaBW3AaXrP-0Q/exec"),
  tedxProgramUrl: "https://www.ted.com/about/programs-initiatives/tedx-program",
  credit: "Made by Tanmay Bhardwaj for The Orbis School",
  licenseLine: "This independent TEDx event is operated under license from TED.",
};

/** Human-friendly event date, or the editable placeholder. */
export const prettyDate = (() => {
  const raw = site.eventDate;
  const d = new Date(raw);
  if (raw.startsWith("[") || Number.isNaN(d.getTime())) return "[EVENT DATE]";
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
})();
