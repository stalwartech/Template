// ─────────────────────────────────────────────────────────────────────────────
// ToggleSwitch.jsx
//
// A fully accessible toggle switch with label, description, and size variants.
//
// Usage (controlled):
//   const [enabled, setEnabled] = useState(false)
//   <ToggleSwitch checked={enabled} onChange={setEnabled} label="Dark Mode" />
//
// Usage (uncontrolled):
//   <ToggleSwitch defaultChecked label="Notifications" />
//
// Usage with description:
//   <ToggleSwitch
//     checked={val}
//     onChange={setVal}
//     label="Email Alerts"
//     description="Receive fee payment notifications via email"
//     size="md"
//     colorVariant="primary"
//   />
//
// Usage disabled:
//   <ToggleSwitch checked disabled label="Feature locked" />
//
// Props:
//   checked        : boolean  — controlled checked state
//   defaultChecked : boolean  — uncontrolled initial state
//   onChange       : (checked: boolean) => void
//   label          : string   — visible label text
//   description    : string   — secondary helper text below label
//   labelPosition  : "right" | "left"   (default: "right")
//   size           : "sm" | "md" | "lg" (default: "md")
//   colorVariant   : "primary" | "accent" | "success" | "danger"  (default: "primary")
//   disabled       : boolean
//   id             : string   — for label/input association
//   className      : string
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useId } from "react";

const TRACK_SIZES = {
  sm: "w-8 h-4",
  md: "w-11 h-6",
  lg: "w-14 h-7",
};

const THUMB_SIZES = {
  sm: { base: "w-3 h-3", on: "translate-x-4", off: "translate-x-0.5" },
  md: { base: "w-4 h-4", on: "translate-x-6", off: "translate-x-1" },
  lg: { base: "w-5 h-5", on: "translate-x-8", off: "translate-x-1" },
};

const LABEL_SIZES = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

const TRACK_COLORS = {
  primary: "bg-primary",
  accent:  "bg-accent",
  success: "bg-success",
  danger:  "bg-danger",
};

export function ToggleSwitch({
  checked: controlledChecked,
  defaultChecked = false,
  onChange,
  label,
  description,
  labelPosition = "right",
  size = "md",
  colorVariant = "primary",
  disabled = false,
  id: propId,
  className = "",
}) {
  const autoId = useId();
  const id = propId || autoId;

  // Support both controlled and uncontrolled
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isControlled = controlledChecked !== undefined;
  const checked = isControlled ? controlledChecked : internalChecked;

  const handleToggle = () => {
    if (disabled) return;
    const next = !checked;
    if (!isControlled) setInternalChecked(next);
    onChange?.(next);
  };

  const trackSize  = TRACK_SIZES[size]  || TRACK_SIZES.md;
  const thumbSize  = THUMB_SIZES[size]  || THUMB_SIZES.md;
  const labelSize  = LABEL_SIZES[size]  || LABEL_SIZES.md;
  const trackColor = TRACK_COLORS[colorVariant] || TRACK_COLORS.primary;

  const track = (
    <button
      type="button"
      role="switch"
      id={id}
      aria-checked={checked}
      aria-label={label}
      aria-describedby={description ? `${id}-desc` : undefined}
      disabled={disabled}
      onClick={handleToggle}
      className={`
        relative inline-flex flex-shrink-0 items-center rounded-badge
        border-2 border-transparent
        transition-colors duration-normal ease-in-out
        focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background
        ${trackSize}
        ${checked ? trackColor : "bg-muted border-border-default"}
        ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}
      `}
    >
      <span
        className={`
          pointer-events-none block rounded-full bg-surface shadow-md
          transform transition-transform duration-normal ease-in-out
          ${thumbSize.base}
          ${checked ? thumbSize.on : thumbSize.off}
        `}
      />
    </button>
  );

  const labelBlock = (label || description) && (
    <label
      htmlFor={id}
      className={`flex flex-col gap-0.5 ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
    >
      {label && (
        <span className={`${labelSize} font-medium text-foreground leading-tight`}>{label}</span>
      )}
      {description && (
        <span id={`${id}-desc`} className="text-xs text-muted-fg leading-snug">
          {description}
        </span>
      )}
    </label>
  );

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {labelPosition === "left" && labelBlock}
      {track}
      {labelPosition === "right" && labelBlock}
    </div>
  );
}

// ─── ToggleGroup — renders a vertical list of related toggles ─────────────────
// Usage:
//   <ToggleGroup title="Notifications">
//     <ToggleSwitch label="Email" checked={...} onChange={...} />
//     <ToggleSwitch label="SMS"   checked={...} onChange={...} />
//   </ToggleGroup>
export function ToggleGroup({ title, description, children, className = "" }) {
  return (
    <div className={`bg-surface border border-border-default rounded-card shadow-card p-5 ${className}`}>
      {title && (
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          {description && <p className="text-xs text-muted-fg mt-0.5">{description}</p>}
        </div>
      )}
      <div className="space-y-4 divide-y divide-border-default">
        {Array.isArray(children)
          ? children.map((child, i) => (
              <div key={i} className={`flex items-center justify-between ${i > 0 ? "pt-4" : ""}`}>
                {child}
              </div>
            ))
          : children
        }
      </div>
    </div>
  );
}

export default ToggleSwitch;