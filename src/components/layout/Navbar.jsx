import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/architecture", label: "Architecture" },
  { to: "/my-impact", label: "My Impact" },
];

export default function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b"
      style={{ borderColor: "var(--border)", background: "rgba(13,15,14,0.92)", backdropFilter: "blur(12px)" }}
    >
      <div className="pres-container flex items-center justify-between h-14">
        <Link
          to="/"
          className="font-semibold text-sm tracking-tight"
          style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: "var(--text)" }}
        >
          CRM <span style={{ color: "var(--accent)" }}>Automation</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="px-4 py-2 text-sm rounded-lg transition-colors"
              style={
                isActive(link.to)
                  ? { color: "var(--accent)", background: "var(--accent-faint)" }
                  : { color: "var(--muted)" }
              }
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          type="button"
          className="md:hidden p-2"
          style={{ color: "var(--muted)" }}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileOpen && (
        <div
          className="md:hidden border-t px-4 py-3 flex flex-col gap-1"
          style={{ borderColor: "var(--border)", background: "var(--surface)" }}
        >
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className="py-2 text-sm"
              style={{ color: isActive(link.to) ? "var(--accent)" : "var(--muted)" }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
