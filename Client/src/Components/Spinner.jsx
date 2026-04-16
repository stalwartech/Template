// ─────────────────────────────────────────────────────────────────────────────
// Loader / Spinner
// Usage:
//   <Spinner />
//   <Spinner variant="dots" size="lg" color="emerald" />
//   <Spinner variant="bars" size="md" color="amber" label="Uploading..." />
//   <Spinner variant="pulse" size="xl" color="sky" />
//   <PageLoader label="Fetching data..." color="indigo" />
//
// Spinner Props:
//   variant : "ring" | "dots" | "bars" | "pulse"                          (default: "ring")
//   size    : "xs" | "sm" | "md" | "lg" | "xl"                            (default: "md")
//   color   : "indigo" | "sky" | "emerald" | "amber" | "red" | "white"   (default: "indigo")
//   label   : string — optional text shown below the spinner
//
// PageLoader Props:
//   label   : string  (default: "Loading...")
//   color   : same color options as Spinner
// ─────────────────────────────────────────────────────────────────────────────

const SIZES = {
  xs: { spinner: "w-4 h-4",   dot: "w-1.5 h-1.5", bar: "w-1 h-3",   text: "text-[10px]" },
  sm: { spinner: "w-6 h-6",   dot: "w-2 h-2",     bar: "w-1 h-4",   text: "text-xs" },
  md: { spinner: "w-8 h-8",   dot: "w-2.5 h-2.5", bar: "w-1.5 h-5", text: "text-sm" },
  lg: { spinner: "w-12 h-12", dot: "w-3 h-3",     bar: "w-2 h-7",   text: "text-sm" },
  xl: { spinner: "w-16 h-16", dot: "w-4 h-4",     bar: "w-2.5 h-9", text: "text-base" },
};

const COLORS = {
  indigo:  { text: "text-indigo-500",  bg: "bg-indigo-500" },
  sky:     { text: "text-sky-400",     bg: "bg-sky-400" },
  emerald: { text: "text-emerald-400", bg: "bg-emerald-400" },
  amber:   { text: "text-amber-400",   bg: "bg-amber-400" },
  red:     { text: "text-red-400",     bg: "bg-red-400" },
  white:   { text: "text-white",       bg: "bg-white" },
};

export function Spinner({ variant = "ring", size = "md", color = "indigo", label }) {
  const sz  = SIZES[size]  || SIZES.md;
  const col = COLORS[color] || COLORS.indigo;

  const renderVariant = () => {
    switch (variant) {
      /* ── Ring ── */
      case "ring":
        return (
          <svg className={`${sz.spinner} animate-spin ${col.text}`} viewBox="0 0 24 24" fill="none">
            <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
            <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        );

      /* ── Dots ── */
      case "dots":
        return (
          <div className="flex items-center gap-1.5">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`${sz.dot} rounded-full ${col.bg}`}
                style={{ animation: `dotBounce 1.2s ease-in-out ${i * 0.2}s infinite` }}
              />
            ))}
            <style>{`
              @keyframes dotBounce {
                0%, 80%, 100% { transform: scale(.6); opacity: .4; }
                40%           { transform: scale(1);  opacity: 1; }
              }
            `}</style>
          </div>
        );

      /* ── Bars ── */
      case "bars":
        return (
          <div className="flex items-end gap-1">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className={`${sz.bar} rounded-full ${col.bg}`}
                style={{ animation: `barPulse 1s ease-in-out ${i * 0.15}s infinite alternate` }}
              />
            ))}
            <style>{`
              @keyframes barPulse {
                from { transform: scaleY(.4); opacity: .5; }
                to   { transform: scaleY(1); opacity: 1; }
              }
            `}</style>
          </div>
        );

      /* ── Pulse ── */
      case "pulse":
        return (
          <div className={`relative flex items-center justify-center ${sz.spinner}`}>
            <span
              className={`absolute w-full h-full rounded-full ${col.bg} opacity-30`}
              style={{ animation: "pulseRing 1.5s cubic-bezier(.215,.61,.355,1) infinite" }}
            />
            <span
              className={`${sz.spinner} rounded-full ${col.bg} opacity-80`}
              style={{ animation: "pulseDot 1.5s cubic-bezier(.455,.03,.515,.955) infinite" }}
            />
            <style>{`
              @keyframes pulseRing {
                0%         { transform: scale(.33); }
                80%, 100%  { opacity: 0; transform: scale(2.4); }
              }
              @keyframes pulseDot {
                0%, 100% { transform: scale(1); }
                50%      { transform: scale(1.1); }
              }
            `}</style>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center gap-2.5" role="status" aria-label={label || "Loading"}>
      {renderVariant()}
      {label && (
        <span className={`${sz.text} font-medium text-slate-400`}>{label}</span>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PageLoader — full-screen overlay with centered spinner card
// ─────────────────────────────────────────────────────────────────────────────

export function PageLoader({ label = "Loading...", color = "indigo" }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      role="status"
      aria-label={label}
    >
      <div className="bg-[#111827] border border-white/10 rounded-2xl px-10 py-8 flex flex-col items-center gap-4 shadow-2xl">
        <Spinner variant="ring" size="lg" color={color} />
        <span className="text-sm font-medium text-slate-400">{label}</span>
      </div>
    </div>
  );
}

export default Spinner;