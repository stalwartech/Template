import { useState } from "react";

// ─── Sidebar Data ────────────────────────────────────────────────────────────
const SIDEBAR_DATA = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
    href: "/dashboard",
  },
  {
    id: "academics",
    label: "Academics",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path d="M12 3L2 8l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    children: [
      { id: "classes", label: "Classes", href: "/academics/classes" },
      { id: "subjects", label: "Subjects", href: "/academics/subjects" },
      { id: "timetable", label: "Timetable", href: "/academics/timetable" },
      { id: "exams", label: "Exams", href: "/academics/exams" },
    ],
  },
  {
    id: "students",
    label: "Students",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <circle cx="8" cy="7" r="4" />
        <path d="M2 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
        <path d="M17 11l2 2 4-4" />
      </svg>
    ),
    children: [
      { id: "all-students", label: "All Students", href: "/students" },
      { id: "admissions", label: "Admissions", href: "/students/admissions" },
      { id: "attendance", label: "Attendance", href: "/students/attendance" },
      { id: "results", label: "Results", href: "/students/results" },
    ],
  },
  {
    id: "staff",
    label: "Staff",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20v-2a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v2" />
      </svg>
    ),
    children: [
      { id: "teachers", label: "Teachers", href: "/staff/teachers" },
      { id: "admin-staff", label: "Admin Staff", href: "/staff/admin" },
      { id: "payroll", label: "Payroll", href: "/staff/payroll" },
    ],
  },
  {
    id: "finance",
    label: "Finance",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    children: [
      { id: "fees", label: "Fee Collection", href: "/finance/fees" },
      { id: "invoices", label: "Invoices", href: "/finance/invoices" },
      { id: "expenses", label: "Expenses", href: "/finance/expenses" },
      { id: "reports", label: "Reports", href: "/finance/reports" },
    ],
  },
  {
    id: "library",
    label: "Library",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path d="M4 19V5a2 2 0 0 1 2-2h13a1 1 0 0 1 1 1v13" />
        <path d="M4 19a2 2 0 0 0 2 2h13" />
        <path d="M4 19a2 2 0 0 1 2-2h13" />
        <line x1="9" y1="7" x2="14" y2="7" />
        <line x1="9" y1="11" x2="14" y2="11" />
      </svg>
    ),
    href: "/library",
  },
  {
    id: "communication",
    label: "Communication",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    children: [
      { id: "announcements", label: "Announcements", href: "/comms/announcements" },
      { id: "messages", label: "Messages", href: "/comms/messages" },
      { id: "notices", label: "Notice Board", href: "/comms/notices" },
    ],
  },
  {
    id: "settings",
    label: "Settings",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
    href: "/settings",
  },
];

// ─── Chevron Icon ─────────────────────────────────────────────────────────────
const ChevronIcon = ({ open }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.2}
    className={`w-3.5 h-3.5 transition-transform duration-300 ${open ? "rotate-90" : "rotate-0"}`}
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

// ─── Sub Menu Item ─────────────────────────────────────────────────────────────
const SubMenuItem = ({ item, activeId, onSelect }) => {
  const isActive = activeId === item.id;
  return (
    <a
      href={item.href}
      onClick={(e) => { e.preventDefault(); onSelect(item.id); }}
      className={`
        flex items-center gap-2.5 pl-10 pr-4 py-2 rounded-lg mx-2 text-sm
        transition-all duration-200 group relative
        ${isActive
          ? "bg-amber-400/15 text-amber-300 font-medium"
          : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
        }
      `}
    >
      <span
        className={`
          w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors duration-200
          ${isActive ? "bg-amber-400" : "bg-slate-600 group-hover:bg-slate-400"}
        `}
      />
      {item.label}
      {isActive && (
        <span className="absolute left-2 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-amber-400 rounded-full" />
      )}
    </a>
  );
};

// ─── Menu Item ────────────────────────────────────────────────────────────────
const MenuItem = ({ item, collapsed, activeId, openMenuId, onSelect, onToggle }) => {
  const hasChildren = item.children && item.children.length > 0;
  const isOpen = openMenuId === item.id;
  const isActive = activeId === item.id || (hasChildren && item.children.some((c) => c.id === activeId));

  const handleClick = (e) => {
    e.preventDefault();
    if (hasChildren) {
      onToggle(item.id);
    } else {
      onSelect(item.id);
    }
  };

  return (
    <div>
      <a
        href={item.href || "#"}
        onClick={handleClick}
        title={collapsed ? item.label : undefined}
        className={`
          flex items-center gap-3 px-3 py-2.5 rounded-xl mx-2 mb-0.5
          transition-all duration-200 group relative
          ${isActive
            ? "bg-amber-400/10 text-amber-300"
            : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
          }
        `}
      >
        {/* Active bar */}
        {isActive && !hasChildren && (
          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-amber-400 rounded-r-full" />
        )}

        {/* Icon */}
        <span className={`flex-shrink-0 transition-colors duration-200 ${isActive ? "text-amber-400" : "text-slate-500 group-hover:text-slate-300"}`}>
          {item.icon}
        </span>

        {/* Label */}
        {!collapsed && (
          <span className="flex-1 font-medium text-sm tracking-wide truncate">
            {item.label}
          </span>
        )}

        {/* Chevron */}
        {!collapsed && hasChildren && (
          <span className={`text-slate-500 transition-colors ${isOpen ? "text-amber-400" : "group-hover:text-slate-300"}`}>
            <ChevronIcon open={isOpen} />
          </span>
        )}

        {/* Collapsed dot indicator for active */}
        {collapsed && isActive && (
          <span className="absolute right-1 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-amber-400" />
        )}
      </a>

      {/* Sub-menu */}
      {hasChildren && !collapsed && (
        <div
          className="overflow-hidden transition-all duration-300 ease-in-out"
          style={{ maxHeight: isOpen ? `${item.children.length * 44}px` : "0px" }}
        >
          <div className="pt-0.5 pb-1">
            {item.children.map((child) => (
              <SubMenuItem
                key={child.id}
                item={child}
                activeId={activeId}
                onSelect={onSelect}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Sidebar Component ────────────────────────────────────────────────────────
export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeId, setActiveId] = useState("dashboard");
  const [openMenuId, setOpenMenuId] = useState(null);

  const handleToggle = (id) => {
    setOpenMenuId((prev) => (prev === id ? null : id));
  };

  const handleSelect = (id) => {
    setActiveId(id);
    setMobileOpen(false);
  };

  const sidebarContent = (
    <div
      className={`
        flex flex-col h-full
        bg-[#0f1117]
        border-r border-white/[0.06]
        transition-all duration-300 ease-in-out
        ${collapsed ? "w-[68px]" : "w-[240px]"}
      `}
    >
      {/* Header */}
      <div className={`flex items-center h-16 px-3 border-b border-white/[0.06] flex-shrink-0 ${collapsed ? "justify-center" : "justify-between"}`}>
        {!collapsed && (
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
                <path d="M12 3L2 8l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth={2} fill="none" />
              </svg>
            </div>
            <div>
              <p className="text-white font-bold text-sm tracking-wide leading-none">EduNexus</p>
              <p className="text-slate-500 text-[10px] mt-0.5 tracking-widest uppercase">School Portal</p>
            </div>
          </div>
        )}

        {collapsed && (
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} className="w-4 h-4">
              <path d="M12 3L2 8l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
        )}

        {!collapsed && (
          <button
            onClick={() => setCollapsed(true)}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
              <path d="M11 17l-5-5 5-5" />
              <path d="M18 17l-5-5 5-5" />
            </svg>
          </button>
        )}
      </div>

      {/* Expand button when collapsed */}
      {collapsed && (
        <div className="flex justify-center pt-3 pb-1">
          <button
            onClick={() => setCollapsed(false)}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
              <path d="M13 17l5-5-5-5" />
              <path d="M6 17l5-5-5-5" />
            </svg>
          </button>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-3 scrollbar-thin">
        {!collapsed && (
          <p className="text-[10px] font-semibold tracking-widest text-slate-600 uppercase px-5 mb-2">
            Main Menu
          </p>
        )}
        {SIDEBAR_DATA.map((item) => (
          <MenuItem
            key={item.id}
            item={item}
            collapsed={collapsed}
            activeId={activeId}
            openMenuId={openMenuId}
            onSelect={handleSelect}
            onToggle={handleToggle}
          />
        ))}
      </nav>

      {/* Footer */}
      <div className={`border-t border-white/[0.06] p-3 flex-shrink-0 ${collapsed ? "flex justify-center" : ""}`}>
        {!collapsed ? (
          <div className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-white/5 cursor-pointer transition-colors group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center flex-shrink-0 text-white text-xs font-bold">
              AA
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-slate-200 text-sm font-medium truncate">Admin User</p>
              <p className="text-slate-500 text-[11px] truncate">admin@edunexus.ng</p>
            </div>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-400 flex-shrink-0">
              <circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" />
            </svg>
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold cursor-pointer" title="Admin User">
            AA
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="fixed top-4 left-4 z-50 p-2 rounded-xl bg-[#0f1117] border border-white/[0.08] text-slate-400 hover:text-slate-200 transition-colors lg:hidden"
        onClick={() => setMobileOpen(true)}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
          <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div
        className={`
          fixed top-0 left-0 h-full z-50 lg:hidden
          transition-transform duration-300
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="w-[240px] h-full">
          {/* Force full width in mobile */}
          <div className="flex flex-col h-full bg-[#0f1117] border-r border-white/[0.06] w-[240px]">
            <div className="flex items-center justify-between h-16 px-3 border-b border-white/[0.06]">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} className="w-4 h-4">
                    <path d="M12 3L2 8l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-bold text-sm tracking-wide leading-none">EduNexus</p>
                  <p className="text-slate-500 text-[10px] mt-0.5 tracking-widest uppercase">School Portal</p>
                </div>
              </div>
              <button onClick={() => setMobileOpen(false)} className="p-1.5 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto py-3">
              <p className="text-[10px] font-semibold tracking-widest text-slate-600 uppercase px-5 mb-2">Main Menu</p>
              {SIDEBAR_DATA.map((item) => (
                <MenuItem
                  key={item.id}
                  item={item}
                  collapsed={false}
                  activeId={activeId}
                  openMenuId={openMenuId}
                  onSelect={handleSelect}
                  onToggle={handleToggle}
                />
              ))}
            </nav>
            <div className="border-t border-white/[0.06] p-3">
              <div className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-white/5 cursor-pointer transition-colors">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold">AA</div>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-200 text-sm font-medium">Admin Account</p>
                  <p className="text-slate-500 text-[11px]">admin@edunexus.ng</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex h-screen sticky top-0">
        {sidebarContent}
      </div>
    </>
  );
}