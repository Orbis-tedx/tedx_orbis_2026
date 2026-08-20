import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import PageShell from "../components/PageShell";
import { subthemes } from "../data/subthemes";
import { quotes } from "../data/quotes";
import { site } from "../data/site";

/* ─── Form model ──────────────────────────────────────────────── */
type FieldKey =
  | "firstName" | "lastName" | "school" | "grade" | "dob"
  | "phone" | "email" | "about" | "subTopic" | "idea"
  | "introduction" | "videoLink";

type FormState = Record<FieldKey, string>;

const initialForm: FormState = {
  firstName: "", lastName: "", school: "", grade: "", dob: "",
  phone: "", email: "", about: "", subTopic: "", idea: "",
  introduction: "", videoLink: "",
};

const WORD_LIMIT = 250;
const countWords = (s: string) => (s.trim() ? s.trim().split(/\s+/).length : 0);

const steps: { title: string; fields: FieldKey[] }[] = [
  { title: "Your name",            fields: ["firstName", "lastName"] },
  { title: "Where you study",      fields: ["school", "grade"] },
  { title: "Date of birth",        fields: ["dob"] },
  { title: "How we reach you",     fields: ["phone", "email"] },
  { title: "About you",            fields: ["about"] },
  { title: "Your subtheme",        fields: ["subTopic"] },
  { title: "Your idea",            fields: ["idea"] },
  { title: "Intro & video",        fields: ["introduction", "videoLink"] },
];

function validateField(key: FieldKey, form: FormState): string | null {
  const v = form[key].trim();
  switch (key) {
    case "firstName":  return v ? null : "Please tell us your first name.";
    case "lastName":   return v ? null : "Please tell us your last name.";
    case "school":     return v ? null : "Which school do you attend?";
    case "grade":      return v ? null : "Your current grade, please.";
    case "dob": {
      if (!v) return "A date of birth is required.";
      const d = new Date(v);
      if (Number.isNaN(d.getTime()) || d > new Date() || d < new Date("1940-01-01"))
        return "That doesn't look right.";
      return null;
    }
    case "phone": {
      if (!v) return "A phone number is required.";
      const digits = v.replace(/[^\d]/g, "");
      if (digits.length < 8 || digits.length > 15) return "Enter a valid phone number.";
      return /^[+\d][\d\s\-().]*$/.test(v) ? null : "Use only digits, spaces, +, - or ( ).";
    }
    case "email":
      return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? null : "A valid email is required.";
    case "about":
      if (!v) return "A few honest sentences will do.";
      return countWords(v) > WORD_LIMIT ? `${WORD_LIMIT} word limit.` : null;
    case "subTopic":
      return v ? null : "Choose the subtheme closest to your idea.";
    case "idea": {
      if (!v) return "Tell us the idea — plainly is fine.";
      return countWords(v) > WORD_LIMIT ? `${WORD_LIMIT} word limit.` : null;
    }
    case "introduction":
      return v ? null : "A brief written introduction to your idea.";
    case "videoLink":
      return /^https?:\/\/\S+/.test(v) ? null : "Paste the full Google Drive link, starting with https://";
    default: return null;
  }
}

/* ─── Small components ─────────────────────────────────────────── */
function Label({ htmlFor, children, helper }: { htmlFor: string; children: string; helper: string }) {
  return (
    <div className="mb-5">
      <label htmlFor={htmlFor} className="block text-[clamp(1.4rem,2.8vw,2.1rem)] leading-tight">
        {children}
      </label>
      <p className="mt-2 text-[14px] text-graphite">{helper}</p>
    </div>
  );
}

function ErrorNote({ id, msg }: { id: string; msg?: string | null }) {
  return (
    <AnimatePresence>
      {msg && (
        <motion.p
          id={id} role="alert"
          initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-2 text-[12px] text-tedred tracking-wide"
        >
          {msg}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

function WordCounter({ value }: { value: string }) {
  const n = countWords(value);
  const near = n > WORD_LIMIT * 0.85;
  return (
    <p aria-live="polite" className={`mt-2 text-[11px] tracking-[0.18em] uppercase ${near ? "text-tedred" : "text-graphite-soft"}`}>
      {n} / {WORD_LIMIT} words
    </p>
  );
}

/* ─── Page ──────────────────────────────────────────────────────── */
export default function Apply() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [submitError, setSubmitError] = useState("");

  const quote = useMemo(() => quotes[step % quotes.length], [step]);
  const current = steps[step];
  const isLast = step === steps.length - 1;

  const set = (key: FieldKey, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validateStep = () => {
    const next: Partial<Record<FieldKey, string>> = {};
    current.fields.forEach((k) => { const m = validateField(k, form); if (m) next[k] = m; });
    setErrors((e) => ({ ...e, ...next }));
    return Object.keys(next).length === 0;
  };

  const goNext = () => { if (validateStep()) setStep((s) => Math.min(s + 1, steps.length - 1)); };
  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLast) { goNext(); return; }
    const all: Partial<Record<FieldKey, string>> = {};
    (Object.keys(initialForm) as FieldKey[]).forEach((k) => { const m = validateField(k, form); if (m) all[k] = m; });
    if (Object.keys(all).length) { setErrors(all); const bad = steps.findIndex((s) => s.fields.some((f) => all[f])); if (bad >= 0) setStep(bad); return; }

    setStatus("sending"); setSubmitError("");
    const payload = { timestamp: new Date().toISOString(), ...form };

    if (!site.sheetsEndpoint) {
      setStatus("error");
      setSubmitError(`Email your application to ${site.email} — the endpoint isn't configured yet.`);
      return;
    }
    try {
      await fetch(site.sheetsEndpoint, {
        method: "POST", mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      });
      setStatus("sent");
    } catch {
      setStatus("error");
      setSubmitError(`Check your connection and try again, or email us at ${site.email}.`);
    }
  };

  /* ─── Success ──────────────────────────────────────────────────── */
  if (status === "sent") {
    return (
      <PageShell>
        <section className="mx-auto flex min-h-[80vh] max-w-[1400px] items-center bg-ink px-5 py-32 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            <p className="kicker text-white/35">Application received</p>
            <h1 className="display mt-6 text-[clamp(2.6rem,7vw,5.5rem)] text-paper leading-[0.95]">
              Your idea is in the pile<span className="text-tedred">.</span>
            </h1>
            <div className="mt-10 h-px w-16 bg-tedred" />
            <p className="mt-10 max-w-2xl text-[17px] leading-[1.8] text-white/65">
              Thank you, {form.firstName || "friend"}. Every application is read in full — not skimmed,
              not filtered by an algorithm. You'll hear at{" "}
              <span className="text-white">{form.email}</span> once the curation is done.
              Speakers never pay to join a TEDx event.
            </p>
            <div className="mt-12 flex flex-wrap items-center gap-6">
              <Link to="/" className="border border-white/25 px-7 py-3.5 text-[12px] uppercase tracking-[0.22em] text-white/70 transition-all duration-500 hover:border-tedred hover:bg-tedred hover:text-white">
                Back to event
              </Link>
              <Link to="/theme" className="text-[14px] text-white/35 transition-colors hover:text-white">
                Re-read the subthemes →
              </Link>
            </div>
          </motion.div>
        </section>
      </PageShell>
    );
  }

  /* ─── Form ─────────────────────────────────────────────────────── */
  return (
    <PageShell>
      <section className="bg-ink text-paper">
        <div className="h-1 w-full bg-tedred" />
        <div className="mx-auto max-w-[1400px] px-5 pb-16 pt-32 md:px-10 md:pt-44">
          <p className="kicker text-white/35">Speaker Registration</p>
          <h1 className="display mt-6 text-[clamp(2.8rem,8vw,6rem)] text-paper leading-[0.95]">
            Apply to speak<span className="text-tedred">.</span>
          </h1>
          <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-white/55">
            Eight steps. Plain answers, in your own voice. No fee at any stage.
          </p>
        </div>
      </section>

      {/* Form body — white paper section */}
      <section className="bg-paper">
        <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-10 md:py-20">
          {/* Progress */}
          <nav className="mb-14" aria-label="Application progress">
            <ol className="flex items-end gap-2 sm:gap-4">
              {steps.map((s, i) => {
                const done = i < step;
                const active = i === step;
                return (
                  <li key={s.title} className="flex-1">
                    <button
                      type="button"
                      onClick={() => i <= step && setStep(i)}
                      disabled={i > step}
                      className="group block w-full text-left disabled:cursor-default"
                    >
                      <span className={`block text-[11px] tracking-[0.2em] transition-colors duration-500 ${
                        active ? "text-tedred" : done ? "text-ink" : "text-graphite-soft/50"
                      }`}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className={`mt-2 block h-px w-full origin-left transition-all duration-700 ${
                        active ? "bg-tedred" : done ? "bg-ink/50" : "bg-ink/10"
                      }`} />
                    </button>
                  </li>
                );
              })}
            </ol>
            <p className="mt-4 text-[13px] text-graphite">
              Step {step + 1} of {steps.length} — <span className="text-ink">{current.title}</span>
            </p>
          </nav>

          <div className="grid gap-14 md:grid-cols-12 md:gap-16">
            {/* Fields */}
            <div className="md:col-span-7 lg:col-span-8">
              <form onSubmit={handleSubmit} noValidate>
                <div className="border border-ink/10 p-7 md:p-10">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="space-y-10"
                    >
                      {/* Step 0 */}
                      {step === 0 && (
                        <>
                          <div>
                            <Label htmlFor="firstName" helper="As it should appear in the programme.">First name</Label>
                            <input id="firstName" name="firstName" type="text" autoComplete="given-name"
                              className={`field ${errors.firstName ? "field-error" : ""}`}
                              value={form.firstName} onChange={(e) => set("firstName", e.target.value)}
                              aria-invalid={!!errors.firstName} aria-describedby={errors.firstName ? "err-fn" : undefined} />
                            <ErrorNote id="err-fn" msg={errors.firstName} />
                          </div>
                          <div>
                            <Label htmlFor="lastName" helper="Family or surname.">Last name</Label>
                            <input id="lastName" name="lastName" type="text" autoComplete="family-name"
                              className={`field ${errors.lastName ? "field-error" : ""}`}
                              value={form.lastName} onChange={(e) => set("lastName", e.target.value)}
                              aria-invalid={!!errors.lastName} aria-describedby={errors.lastName ? "err-ln" : undefined} />
                            <ErrorNote id="err-ln" msg={errors.lastName} />
                          </div>
                        </>
                      )}

                      {/* Step 1 */}
                      {step === 1 && (
                        <>
                          <div>
                            <Label htmlFor="school" helper="Full name of your school or institution.">School</Label>
                            <input id="school" name="school" type="text"
                              className={`field ${errors.school ? "field-error" : ""}`}
                              value={form.school} onChange={(e) => set("school", e.target.value)}
                              aria-invalid={!!errors.school} aria-describedby={errors.school ? "err-school" : undefined} />
                            <ErrorNote id="err-school" msg={errors.school} />
                          </div>
                          <div>
                            <Label htmlFor="grade" helper="e.g. 10, XI, Year 12.">Grade</Label>
                            <input id="grade" name="grade" type="text" inputMode="numeric"
                              className={`field ${errors.grade ? "field-error" : ""}`}
                              value={form.grade} onChange={(e) => set("grade", e.target.value)}
                              aria-invalid={!!errors.grade} aria-describedby={errors.grade ? "err-grade" : undefined} />
                            <ErrorNote id="err-grade" msg={errors.grade} />
                          </div>
                        </>
                      )}

                      {/* Step 2 */}
                      {step === 2 && (
                        <div>
                          <Label htmlFor="dob" helper="Used only to confirm eligibility — never published.">Date of birth</Label>
                          <input id="dob" name="dob" type="date"
                            className={`field ${errors.dob ? "field-error" : ""}`}
                            value={form.dob} max={new Date().toISOString().slice(0, 10)}
                            onChange={(e) => set("dob", e.target.value)}
                            aria-invalid={!!errors.dob} aria-describedby={errors.dob ? "err-dob" : undefined} />
                          <ErrorNote id="err-dob" msg={errors.dob} />
                        </div>
                      )}

                      {/* Step 3 */}
                      {step === 3 && (
                        <>
                          <div>
                            <Label htmlFor="phone" helper="Include country code if outside India.">Phone number</Label>
                            <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="+91 …"
                              className={`field ${errors.phone ? "field-error" : ""}`}
                              value={form.phone} onChange={(e) => set("phone", e.target.value)}
                              aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "err-phone" : undefined} />
                            <ErrorNote id="err-phone" msg={errors.phone} />
                          </div>
                          <div>
                            <Label htmlFor="email" helper="All decisions are sent here.">Email ID</Label>
                            <input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com"
                              className={`field ${errors.email ? "field-error" : ""}`}
                              value={form.email} onChange={(e) => set("email", e.target.value)}
                              aria-invalid={!!errors.email} aria-describedby={errors.email ? "err-email" : undefined} />
                            <ErrorNote id="err-email" msg={errors.email} />
                          </div>
                        </>
                      )}

                      {/* Step 4 */}
                      {step === 4 && (
                        <div>
                          <Label htmlFor="about" helper={`Who are you when you're not applying for things? Max ${WORD_LIMIT} words.`}>
                            Tell us about yourself
                          </Label>
                          <textarea id="about" name="about" rows={7}
                            className={`field ${errors.about ? "field-error" : ""}`}
                            value={form.about} onChange={(e) => set("about", e.target.value)}
                            aria-invalid={!!errors.about} aria-describedby="count-about" />
                          <div id="count-about"><WordCounter value={form.about} /></div>
                          <ErrorNote id="err-about" msg={errors.about} />
                        </div>
                      )}

                      {/* Step 5 */}
                      {step === 5 && (
                        <div>
                          <Label htmlFor="subTopic" helper="Pick the subtheme your idea sits closest to.">
                            Sub topic
                          </Label>
                          <div className="relative">
                            <select id="subTopic" name="subTopic"
                              className={`field pr-8 ${errors.subTopic ? "field-error" : ""}`}
                              value={form.subTopic} onChange={(e) => set("subTopic", e.target.value)}
                              aria-invalid={!!errors.subTopic} aria-describedby={errors.subTopic ? "err-sub" : undefined}>
                              <option value="">Select a subtheme…</option>
                              {subthemes.map((s) => (
                                <option key={s.id} value={s.title}>{s.title}</option>
                              ))}
                            </select>
                            <span className="pointer-events-none absolute right-1 top-3.5 text-graphite text-lg">▾</span>
                          </div>
                          <ErrorNote id="err-sub" msg={errors.subTopic} />
                          <Link to="/theme" className="uline mt-5 inline-block text-[13px] uppercase tracking-[0.2em] text-graphite">
                            Read the subthemes →
                          </Link>
                        </div>
                      )}

                      {/* Step 6 */}
                      {step === 6 && (
                        <div>
                          <Label htmlFor="idea" helper={`What is the idea, and why does it belong to this theme? Max ${WORD_LIMIT} words.`}>
                            Describe your original idea
                          </Label>
                          <textarea id="idea" name="idea" rows={9}
                            className={`field ${errors.idea ? "field-error" : ""}`}
                            value={form.idea} onChange={(e) => set("idea", e.target.value)}
                            aria-invalid={!!errors.idea} aria-describedby="count-idea" />
                          <div id="count-idea"><WordCounter value={form.idea} /></div>
                          <ErrorNote id="err-idea" msg={errors.idea} />
                        </div>
                      )}

                      {/* Step 7 */}
                      {step === 7 && (
                        <>
                          <div>
                            <Label htmlFor="introduction" helper="A short written introduction — as you would open the talk.">
                              Introduction & brief description
                            </Label>
                            <textarea id="introduction" name="introduction" rows={7}
                              className={`field ${errors.introduction ? "field-error" : ""}`}
                              value={form.introduction} onChange={(e) => set("introduction", e.target.value)}
                              aria-invalid={!!errors.introduction} aria-describedby={errors.introduction ? "err-intro" : undefined} />
                            <ErrorNote id="err-intro" msg={errors.introduction} />
                          </div>
                          <div>
                            <Label htmlFor="videoLink" helper="Google Drive link. Ensure sharing is set to 'Anyone with the link'.">
                              Video link (Google Drive)
                            </Label>
                            <input id="videoLink" name="videoLink" type="url" inputMode="url"
                              placeholder="https://drive.google.com/…"
                              className={`field ${errors.videoLink ? "field-error" : ""}`}
                              value={form.videoLink} onChange={(e) => set("videoLink", e.target.value)}
                              aria-invalid={!!errors.videoLink} aria-describedby={errors.videoLink ? "err-vid" : undefined} />
                            <ErrorNote id="err-vid" msg={errors.videoLink} />
                          </div>
                        </>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {/* Controls */}
                  <div className="mt-12 flex items-center justify-between gap-4 border-t border-ink/10 pt-6">
                    <button type="button" onClick={goBack} disabled={step === 0}
                      className="text-[12px] uppercase tracking-[0.22em] text-graphite disabled:opacity-25">
                      ← Back
                    </button>
                    {isLast ? (
                      <button type="submit" disabled={status === "sending"}
                        className="bg-ink px-8 py-4 text-[12px] uppercase tracking-[0.26em] text-paper transition-colors duration-500 hover:bg-tedred disabled:opacity-50">
                        {status === "sending" ? "Sending…" : "Submit application"}
                      </button>
                    ) : (
                      <button type="button" onClick={goNext}
                        className="group inline-flex items-center gap-3 bg-ink px-8 py-4 text-[12px] uppercase tracking-[0.26em] text-paper transition-colors duration-500 hover:bg-tedred">
                        Continue
                        <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
                      </button>
                    )}
                  </div>

                  {status === "error" && (
                    <p role="alert" className="mt-5 text-[13px] text-tedred">{submitError}</p>
                  )}
                </div>
              </form>
            </div>

            {/* Quote sidebar */}
            <aside className="md:col-span-5 lg:col-span-4">
              <div className="md:sticky md:top-28">
                <p className="kicker">While you write</p>
                <AnimatePresence mode="wait">
                  <motion.blockquote
                    key={quote.text}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-5 border-l-2 border-tedred pl-6"
                  >
                    <p className="text-[clamp(1.05rem,2vw,1.45rem)] italic leading-[1.5] text-graphite">
                      "{quote.text}"
                    </p>
                    <footer className="kicker mt-5">— {quote.source}</footer>
                  </motion.blockquote>
                </AnimatePresence>

                <div className="rule-strong mt-10" />
                <p className="mt-5 text-[13px] leading-relaxed text-graphite">
                  Speakers never pay to join a TEDx event. Coaching and attendance are free.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
