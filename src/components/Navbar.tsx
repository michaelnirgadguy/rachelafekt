import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { to: "/", label: "בית" },
  { to: "/archive", label: "ארכיון" },
  { to: "/about", label: "אודות" },
  { to: "/contact", label: "צרו קשר" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all ${
        scrolled
          ? "bg-background/90 backdrop-blur border-b border-border"
          : "bg-background border-b border-transparent"
      }`}
    >
      <div className="container-wide flex items-center justify-between px-6 lg:px-20 h-16">
        <Link to="/" className="font-heading text-lg md:text-xl text-foreground">
          רחל אפק
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `text-sm font-body link-underline ${
                  isActive ? "text-primary" : "text-foreground/80 hover:text-foreground"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          aria-label="פתיחת תפריט"
          className="md:hidden p-2 text-foreground"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <nav className="md:hidden border-t border-border bg-background">
          <ul className="px-6 py-4 flex flex-col gap-3">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    `block py-1 text-base font-body ${
                      isActive ? "text-primary" : "text-foreground/80"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
