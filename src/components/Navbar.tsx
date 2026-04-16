import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Zap, Menu, X, Globe, LogOut, User } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useAuth } from "@/hooks/useAuth";

const Navbar = () => {
  const { lang, setLang, t } = useLanguage();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: t.nav.problem[lang], to: "/#problem" },
    { label: t.nav.solution[lang], to: "/#solution" },
    { label: t.nav.tariffs[lang], to: "/tariffs" },
  ];

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass-card border-b py-3" : "py-5 bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="flex items-center gap-2 font-display font-bold text-xl"
        >
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-primary">
            <Zap className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="gradient-text">EcoWatt</span>
          <span className="text-foreground">AI Web</span>
        </button>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
          {user && (
            <>
              <Link
                to="/profile"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {lang === "sq" ? "Profili" : "Profile"}
              </Link>
              <Link
                to="/community-map"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {lang === "sq" ? "Harta e Komunitetit" : "Community Map"}
              </Link>
            </>
          )}
          <button
            onClick={() => setLang(lang === "sq" ? "en" : "sq")}
            className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border border-border/50 hover:border-primary/30 transition-colors text-muted-foreground hover:text-primary"
          >
            <Globe className="w-3.5 h-3.5" />
            {t.langSwitch[lang === "sq" ? "en" : "sq"]}
          </button>
          {user ? (
            <div className="flex items-center gap-3">
              <Link to="/profile" className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                {user.email?.split("@")[0]}
              </Link>
              <button onClick={() => signOut()} className="text-xs text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1">
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <Link to="/sign-up" className="btn-primary-eco text-xs px-5 py-2.5">{t.nav.signUp[lang]}</Link>
          )}
        </div>

        <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden glass-card mt-2 mx-4 rounded-xl p-4 flex flex-col gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className="text-sm font-medium text-muted-foreground hover:text-primary py-2"
            >
              {link.label}
            </Link>
          ))}
          {user && (
            <>
              <Link
                to="/profile"
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-muted-foreground hover:text-primary py-2"
              >
                {lang === "sq" ? "Profili" : "Profile"}
              </Link>
              <Link
                to="/community-map"
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-muted-foreground hover:text-primary py-2"
              >
                {lang === "sq" ? "Harta e Komunitetit" : "Community Map"}
              </Link>
            </>
          )}
          <button
            onClick={() => { setLang(lang === "sq" ? "en" : "sq"); setMobileOpen(false); }}
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary py-2"
          >
            <Globe className="w-4 h-4" />
            {t.langSwitch[lang === "sq" ? "en" : "sq"]}
          </button>
          {user ? (
            <div className="flex flex-col gap-2">
              <Link to="/profile" onClick={() => setMobileOpen(false)} className="text-sm text-muted-foreground hover:text-primary py-2 flex items-center gap-2">
                <User className="w-4 h-4" /> {lang === "sq" ? "Profili" : "Profile"}
              </Link>
              <button onClick={() => { signOut(); setMobileOpen(false); }} className="text-sm text-muted-foreground hover:text-destructive py-2 flex items-center gap-2">
                <LogOut className="w-4 h-4" /> {lang === "sq" ? "Dil" : "Sign Out"}
              </button>
            </div>
          ) : (
            <Link to="/sign-up" onClick={() => setMobileOpen(false)} className="btn-primary-eco text-xs text-center mt-2">{t.nav.signUp[lang]}</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
