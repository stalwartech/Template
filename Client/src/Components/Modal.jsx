import { useEffect, useRef } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// Modal / Dialog
// Usage:
//   const [open, setOpen] = useState(false)
//
//   <Modal
//     open={open}
//     onClose={() => setOpen(false)}
//     title="Edit Profile"
//     size="md"
//     footer={
//       <>
//         <ModalButton onClick={() => setOpen(false)}>Cancel</ModalButton>
//         <ModalButton variant="primary" onClick={handleSave}>Save</ModalButton>
//       </>
//     }
//   >
//     <p>Modal content here</p>
//   </Modal>
//
// Props:
//   open      : boolean (required)
//   onClose   : () => void (required)
//   title     : string (optional)
//   size      : "sm" | "md" | "lg" | "xl" | "full"  (default: "md")
//   children  : ReactNode
//   footer    : ReactNode — bottom action area (optional)
//   closable  : boolean — show the X button and allow backdrop/Esc close (default: true)
// ─────────────────────────────────────────────────────────────────────────────

const MODAL_SIZES = {
  sm:   "max-w-sm",
  md:   "max-w-md",
  lg:   "max-w-lg",
  xl:   "max-w-2xl",
  full: "max-w-5xl",
};

export function Modal({
  open,
  onClose,
  title,
  size = "md",
  children,
  footer,
  closable = true,
}) {
  const overlayRef = useRef(null);

  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => e.key === "Escape" && closable && onClose();
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose, closable]);

  // Lock body scroll while open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      onClick={(e) => e.target === overlayRef.current && closable && onClose()}
      className="fixed inset-0 z-50 flex items-center justify-center p-4
        bg-black/60 backdrop-blur-sm
        animate-[fadeIn_0.15s_ease]"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
    >
      <div
        className={`
          relative w-full ${MODAL_SIZES[size] || MODAL_SIZES.md}
          bg-[#111827] border border-white/10 rounded-2xl shadow-2xl
          flex flex-col max-h-[90vh]
          animate-[slideUp_0.2s_cubic-bezier(.16,1,.3,1)]
        `}
      >
        {/* Header */}
        {(title || closable) && (
          <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-white/[0.08] flex-shrink-0">
            {title && (
              <h2 id="modal-title" className="text-white font-semibold text-base tracking-tight">
                {title}
              </h2>
            )}
            {closable && (
              <button
                onClick={onClose}
                className="ml-auto p-1.5 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-colors"
                aria-label="Close modal"
              >
                <svg viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                  <path d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.75.75 0 1 1 1.06 1.06L9.06 8l3.22 3.22a.75.75 0 1 1-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 0 1-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06z" />
                </svg>
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 text-slate-300 text-sm leading-relaxed">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="px-6 py-4 border-t border-white/[0.08] flex items-center justify-end gap-3 flex-shrink-0">
            {footer}
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn  { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(16px) scale(.97) } to { opacity: 1; transform: translateY(0) scale(1) } }
      `}</style>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ModalButton — convenience button for use inside Modal's footer prop
// Usage:
//   <ModalButton variant="primary" onClick={handleSave}>Save Changes</ModalButton>
//   <ModalButton onClick={onClose}>Cancel</ModalButton>
//   <ModalButton variant="danger" onClick={handleDelete}>Delete</ModalButton>
//
// Props:
//   variant  : "default" | "primary" | "danger" | "success"  (default: "default")
//   onClick  : () => void
//   disabled : boolean
//   className: string
// ─────────────────────────────────────────────────────────────────────────────

const BUTTON_VARIANTS = {
  default: "bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10 hover:text-white",
  primary: "bg-indigo-600 text-white hover:bg-indigo-500 active:scale-[0.98]",
  danger:  "bg-red-600 text-white hover:bg-red-500 active:scale-[0.98]",
  success: "bg-emerald-600 text-white hover:bg-emerald-500 active:scale-[0.98]",
};

export function ModalButton({ children, variant = "default", onClick, disabled, className = "" }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150
        disabled:opacity-50 disabled:cursor-not-allowed
        ${BUTTON_VARIANTS[variant] || BUTTON_VARIANTS.default}
        ${className}
      `}
    >
      {children}
    </button>
  );
}

export default Modal;