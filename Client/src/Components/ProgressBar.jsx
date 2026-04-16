// ─────────────────────────────────────────────────────────────────────────────
// Progress Bar
// Usage:
//   <ProgressBar value={65} />
//   <ProgressBar value={40} color="emerald" label="Uploading..." showValue />
//   <ProgressBar value={80} color="amber" size="lg" animate />
//   <ProgressBar value={55} color="sky" showValue label="Storage" striped animate />
//
//   // Stepped variant:
//   <ProgressBar
//     variant="stepped"
//     value={3}
//     steps={5}
//     label="Admission Progress"
//     labels={["Apply", "Review", "Interview", "Offer", "Enrolled"]}
//   />
//
// Props (default variant):
//   value     : number 0–100 (required)
//   color     : "indigo" | "sky" | "emerald" | "amber" | "red"  (default: "indigo")
//   size      : "xs" | "sm" | "md" | "lg"                        (default: "sm")
//   rounded   : "sm" | "full"                                     (default: "full")
//   label     : string — shown above left
//   showValue : boolean — shows percentage above right
//   animate   : boolean — shimmer sweep on the fill
//   striped   : boolean — diagonal stripe pattern (animates if animate=true)
//
// Props (stepped variant):
//   variant   : "stepped"
//   value     : number — current step (1-based, e.g. 3 = 3 steps done)
//   steps     : number — total number of steps
//   label     : string — section heading above the stepper
//   labels    : string[] — label under each step circle
// ─────────────────────────────────────────────────────────────────────────────

const COLORS = {
  indigo:  { fill: "bg-indigo-500",  text: "text-indigo-400" },
  sky:     { fill: "bg-sky-400",     text: "text-sky-400" },
  emerald: { fill: "bg-emerald-500", text: "text-emerald-400" },
  amber:   { fill: "bg-amber-400",   text: "text-amber-400" },
  red:     { fill: "bg-red-500",     text: "text-red-400" },
};

const HEIGHTS = {
  xs: "h-1",
  sm: "h-1.5",
  md: "h-2.5",
  lg: "h-4",
};

export function ProgressBar({
  value = 0,
  color = "indigo",
  size = "sm",
  rounded = "full",
  label,
  showValue = false,
  animate = false,
  striped = false,
  variant = "default",
  steps,
  labels,
}) {
  const pct = Math.min(100, Math.max(0, value));
  const cfg = COLORS[color] || COLORS.indigo;
  const h   = HEIGHTS[size] || HEIGHTS.sm;
  const r   = rounded === "full" ? "rounded-full" : "rounded";

  // ── Stepped variant ──────────────────────────────────────────────────────
  if (variant === "stepped" && steps) {
    return (
      <div className="w-full">
        {label && (
          <p className="text-sm font-medium text-slate-300 mb-3">{label}</p>
        )}

        <div className="flex items-start">
          {Array.from({ length: steps }).map((_, i) => {
            const done   = i < value;
            const active = i === value - 1;

            const circleClass = done
              ? `${cfg.fill} border-transparent text-white`
              : "border-white/15 text-slate-500 bg-white/5";

            const leftLine  = i > 0       ? (i <= value - 1 ? cfg.fill : "bg-white/10") : null;
            const rightLine = i < steps - 1 ? (i < value - 1  ? cfg.fill : "bg-white/10") : null;

            const labelColor = done ? cfg.text : "text-slate-600";

            return (
              <div key={i} className="flex-1 flex flex-col items-center">
                {/* Connector row */}
                <div className="flex items-center w-full">
                  {leftLine  && <div className={`flex-1 h-0.5 ${leftLine}  transition-all duration-300`} />}
                  <div
                    className={`
                      w-8 h-8 rounded-full flex items-center justify-center
                      text-xs font-semibold border-2 flex-shrink-0
                      transition-all duration-300
                      ${circleClass}
                      ${active ? "ring-2 ring-offset-1 ring-offset-[#0a0d14] ring-current scale-110" : ""}
                    `}
                  >
                    {done ? (
                      <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
                        <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0z" />
                      </svg>
                    ) : i + 1}
                  </div>
                  {rightLine && <div className={`flex-1 h-0.5 ${rightLine} transition-all duration-300`} />}
                </div>

                {/* Step label */}
                {labels?.[i] && (
                  <span className={`text-[10px] font-medium mt-2 text-center px-1 ${labelColor}`}>
                    {labels[i]}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ── Default bar variant ───────────────────────────────────────────────────
  return (
    <div className="w-full">
      {/* Header row */}
      {(label || showValue) && (
        <div className="flex items-center justify-between mb-1.5">
          {label    && <span className="text-sm font-medium text-slate-300">{label}</span>}
          {showValue && <span className={`text-xs font-semibold tabular-nums ${cfg.text}`}>{Math.round(pct)}%</span>}
        </div>
      )}

      {/* Track */}
      <div className={`w-full ${h} ${r} bg-white/[0.07] overflow-hidden`}>
        <div
          className={`h-full ${r} ${cfg.fill} transition-all duration-500 ease-out relative overflow-hidden`}
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={Math.round(pct)}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          {/* Striped pattern */}
          {striped && (
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(255,255,255,0.5) 4px, rgba(255,255,255,0.5) 8px)",
                backgroundSize: "16px 16px",
                animation: animate ? "stripedMove 1s linear infinite" : "none",
              }}
            />
          )}

          {/* Shimmer sweep */}
          {animate && !striped && (
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full"
              style={{ animation: "shimmer 2s infinite" }}
            />
          )}
        </div>
      </div>

      <style>{`
        @keyframes shimmer     { to { transform: translateX(400%); } }
        @keyframes stripedMove { from { background-position: 0 0; } to { background-position: 32px 0; } }
      `}</style>
    </div>
  );
}

export default ProgressBar;