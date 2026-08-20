import { Suspense, lazy, useEffect, useState } from "react";

const TEDx3D = lazy(() => import("./TEDx3D"));

/** Static, non-WebGL stand-in: a drawn bulb. Used before load, on low-power
 *  devices, and whenever the visitor prefers reduced motion. */
function BulbFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center" aria-hidden="true">
      <svg viewBox="0 0 200 260" className="h-[70%] w-auto text-ink/35" fill="none" stroke="currentColor" strokeWidth="1">
        <circle cx="100" cy="96" r="62" />
        <path d="M74 152c0 12-4 18-4 26h60c0-8-4-14-4-26" />
        <path d="M70 186h60M72 200h56M78 214h44M88 228h24" />
        <path d="M86 118c0-22 7-30 14-30s14 8 14 30" stroke="#e62b1e" strokeWidth="1.2" />
      </svg>
    </div>
  );
}

export default function Hero3D() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Only mount WebGL when the device can plausibly handle it, and after
    // first paint so the canvas never blocks the hero typography.
    const lowPower =
      typeof navigator !== "undefined" &&
      ((navigator.hardwareConcurrency ?? 8) <= 2 || /Android 5|Android 6/.test(navigator.userAgent));
    let supported = false;
    try {
      const c = document.createElement("canvas");
      supported = !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {
      supported = false;
    }
    if (!supported || lowPower) return;
    const id = window.setTimeout(() => setEnabled(true), 350);
    return () => window.clearTimeout(id);
  }, []);

  if (!enabled) return <BulbFallback />;

  return (
    <Suspense fallback={<BulbFallback />}>
      <TEDx3D />
    </Suspense>
  );
}
