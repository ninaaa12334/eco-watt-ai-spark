import { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { Zap, ArrowLeft, User, Mail, Lock, Home, Users, Gauge } from "lucide-react";

const SignUp = () => {
  const { lang, t } = useLanguage();
  const s = t.signUp;
  const [meterType, setMeterType] = useState("dual");

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12" style={{ background: "var(--gradient-hero)" }}>
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          {lang === "sq" ? "Kthehu në faqen kryesore" : "Back to home"}
        </Link>

        <div className="glass-card p-8 rounded-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-primary">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display text-xl font-bold text-foreground">{s.title[lang]}</h1>
              <p className="text-xs text-muted-foreground">{s.subtitle[lang]}</p>
            </div>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">{s.firstName[lang]}</label>
                <div className="relative">
                  <User className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                  <input type="text" placeholder="Filan" className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-border/50 bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">{s.lastName[lang]}</label>
                <div className="relative">
                  <User className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                  <input type="text" placeholder="Fisteku" className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-border/50 bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">{s.email[lang]}</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                <input type="email" placeholder="email@shembull.com" className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-border/50 bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">{s.password[lang]}</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                <input type="password" placeholder="••••••••" className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-border/50 bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">{s.confirmPassword[lang]}</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                <input type="password" placeholder="••••••••" className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-border/50 bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">{s.city[lang]}</label>
                <div className="relative">
                  <Home className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                  <input type="text" placeholder="Prishtinë" className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-border/50 bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">{s.householdSize[lang]}</label>
                <div className="relative">
                  <Users className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                  <input type="number" placeholder="4" className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-border/50 bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">{s.meterType[lang]}</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setMeterType("dual")}
                  className={`flex items-center gap-2 p-3 rounded-xl border text-sm font-medium transition-all ${
                    meterType === "dual"
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border/50 bg-card text-muted-foreground hover:border-primary/30"
                  }`}
                >
                  <Gauge className="w-4 h-4" />
                  {s.meterDual[lang]}
                </button>
                <button
                  type="button"
                  onClick={() => setMeterType("single")}
                  className={`flex items-center gap-2 p-3 rounded-xl border text-sm font-medium transition-all ${
                    meterType === "single"
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border/50 bg-card text-muted-foreground hover:border-primary/30"
                  }`}
                >
                  <Gauge className="w-4 h-4" />
                  {s.meterSingle[lang]}
                </button>
              </div>
            </div>

            <button type="submit" className="btn-primary-eco w-full mt-2">
              {s.submitBtn[lang]}
            </button>

            <p className="text-xs text-center text-muted-foreground">{s.terms[lang]}</p>

            <p className="text-sm text-center text-muted-foreground">
              {s.alreadyAccount[lang]}{" "}
              <Link to="/" className="text-primary font-medium hover:underline">{s.logIn[lang]}</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
