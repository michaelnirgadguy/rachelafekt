import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const navItems = [
  { label: "הספר", href: "/#book" },
  { label: "אודות", href: "/#about" },
  { label: "הגישה שלי", href: "/#approach" },
  { label: "מאמרים", href: "/#articles" },
  { label: "צור קשר", href: "/#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-center py-4 px-6 relative">
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="text-foreground/80 hover:text-primary transition-colors font-body text-base font-medium"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <Link to="/" className="font-heading text-xl font-bold text-primary absolute right-6">
          דן גיא
        </Link>
        <button
          className="md:hidden text-foreground absolute left-6"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-background border-t border-border px-6 py-4 space-y-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="block text-foreground/80 hover:text-primary transition-colors font-body"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
