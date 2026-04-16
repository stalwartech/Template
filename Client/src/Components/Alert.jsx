import { useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// Alert Box
// Usage:
//   <Alert variant="success" title="Saved!" message="Your changes have been saved." />
//   <Alert variant="error" title="Error" message="Something went wrong." dismissible />
//   <Alert variant="warning" message="Your session expires in 5 minutes." dismissible />
//   <Alert variant="info" title="Heads up" message="A new update is available." onDismiss={() => {}} />
//
// Props:
//   variant     : "success" | "error" | "warning" | "info"   (default: "info")
//   title       : string (optional)
//   message     : string (required)
//   dismissible : boolean — shows a close button
//   onDismiss   : () => void — called after dismissal animation
//   className   : string — extra Tailwind classes
// ─────────────────────────────────────────────────────────────────────────────

const ALERT_CONFIG = {
  success: {
    wrapper: "bg-emerald-950/60 border-emerald-500/30 text-emerald-300",
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5">
        <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5z" />
      </svg>
    ),
    bar: "bg-emerald-500",
    title: "text-emerald-200",
    dismiss: "text-emerald-400 hover:text-emerald-200 hover:bg-emerald-500/20",
  },
  error: {
    wrapper: "bg-red-950/60 border-red-500/30 text-red-300",
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5">
        <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22z" />
      </svg>
    ),
    bar: "bg-red-500",
    title: "text-red-200",
    dismiss: "text-red-400 hover:text-red-200 hover:bg-red-500/20",
  },
  warning: {
    wrapper: "bg-amber-950/60 border-amber-500/30 text-amber-300",
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5">
        <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 5zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
      </svg>
    ),
    bar: "bg-amber-500",
    title: "text-amber-200",
    dismiss: "text-amber-400 hover:text-amber-200 hover:bg-amber-500/20",
  },
  info: {
    wrapper: "bg-sky-950/60 border-sky-500/30 text-sky-300",
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-sky-400 flex-shrink-0 mt-0.5">
        <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9z" />
      </svg>
    ),
    bar: "bg-sky-500",
    title: "text-sky-200",
    dismiss: "text-sky-400 hover:text-sky-200 hover:bg-sky-500/20",
  },
};

export function Alert({
  variant = "info",
  title,
  message,
  dismissible = false,
  onDismiss,
  className = "",
}) {
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);

  const handleDismiss = () => {
    setLeaving(true);
    setTimeout(() => {
      setVisible(false);
      onDismiss?.();
    }, 250);
  };

  if (!visible) return null;

  const cfg = ALERT_CONFIG[variant] || ALERT_CONFIG.info;

  return (
    <div
      className={`
        relative flex items-start gap-3 rounded-xl border px-4 py-3.5
        transition-all duration-250
        ${cfg.wrapper}
        ${leaving ? "opacity-0 scale-95" : "opacity-100 scale-100"}
        ${className}
      `}
    >
      {/* Left accent bar */}
      <span className={`absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full ${cfg.bar}`} />

      {/* Icon */}
      {cfg.icon}

      {/* Content */}
      <div className="flex-1 min-w-0">
        {title && (
          <p className={`text-sm font-semibold mb-0.5 ${cfg.title}`}>{title}</p>
        )}
        <p className="text-sm leading-relaxed">{message}</p>
      </div>

      {/* Dismiss button */}
      {dismissible && (
        <button
          onClick={handleDismiss}
          className={`p-1 rounded-lg transition-colors flex-shrink-0 ${cfg.dismiss}`}
          aria-label="Dismiss alert"
        >
          <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
            <path d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.75.75 0 1 1 1.06 1.06L9.06 8l3.22 3.22a.75.75 0 1 1-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 0 1-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06z" />
          </svg>
        </button>
      )}
    </div>
  );
}

export default Alert;