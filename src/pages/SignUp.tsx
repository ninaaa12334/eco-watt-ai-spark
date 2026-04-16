import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import { Zap, ArrowLeft, User, Mail, Lock, Home, Users, Gauge, Loader2 } from "lucide-react";
import { toast } from "sonner";

const SignUp = () => {
  const { lang, t } = useLanguage();
  const s = t.signUp;
  const { signUp, signIn } = useAuth();
  const navigate = useNavigate();
  const [meterType, setMeterType] = useState("dual");
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", password: "", confirmPassword: "", city: "Prishtinë", householdSize: "4",
  });

  const update = (key: string, val: string) => setForm((p) => ({ ...p, [key]: val }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error(lang === "sq" ? "Plotësoni email dhe fjalëkalimin" : "Fill in email and password");
      return;
    }

    if (!isLogin) {
      if (form.password !== form.confirmPassword) {
        toast.error(lang === "sq" ? "Fjalëkalimet nuk përputhen" : "Passwords do not match");
        return;
      }
      if (form.password.length < 6) {
        toast.error(lang === "sq" ? "Fjalëkalimi duhet të ketë së paku 6 karaktere" : "Password must be at least 6 characters");
        return;
      }
    }

    setLoading(true);
    try {
      if (isLogin) {
        const { error } = await signIn(form.email, form.password);
        if (error) throw error;
        toast.success(lang === "sq" ? "Hyrët me sukses!" : "Logged in successfully!");
      } else {
        const { error } = await signUp(form.email, form.password, {
          first_name: form.firstName,
          last_name: form.lastName,
          city: form.city,
          household_size: parseInt(form.householdSize) || 4,
          meter_type: meterType,
        });
        if (error) throw error;
        toast.success(lang === "sq" ? "Llogaria u krijua me sukses!" : "Account created successfully!");
      }
      navigate("/profile");
    } catch (err: any) {
      toast.error(err.message || "Error");
    }
    setLoading(false);
  };

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
              <h1 className="font-display text-xl font-bold text-foreground">
                {isLogin ? (lang === "sq" ? "Kyçu" : "Log In") : s.title[lang]}
              </h1>
              <p className="text-xs text-muted-foreground">{s.subtitle[lang]}</p>
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">{s.firstName[lang]}</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                    <input type="text" value={form.firstName} onChange={(e) => update("firstName", e.target.value)} placeholder="Filan" className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-border/50 bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">{s.lastName[lang]}</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                    <input type="text" value={form.lastName} onChange={(e) => update("lastName", e.target.value)} placeholder="Fisteku" className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-border/50 bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">{s.email[lang]}</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="email@shembull.com" className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-border/50 bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">{s.password[lang]}</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                <input type="password" value={form.password} onChange={(e) => update("password", e.target.value)} placeholder="••••••••" className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-border/50 bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
            </div>

            {!isLogin && (
              <>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">{s.confirmPassword[lang]}</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                    <input type="password" value={form.confirmPassword} onChange={(e) => update("confirmPassword", e.target.value)} placeholder="••••••••" className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-border/50 bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1 block">{s.city[lang]}</label>
                    <div className="relative">
                      <Home className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                      <input type="text" value={form.city} onChange={(e) => update("city", e.target.value)} placeholder="Prishtinë" className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-border/50 bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1 block">{s.householdSize[lang]}</label>
                    <div className="relative">
                      <Users className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                      <input type="number" value={form.householdSize} onChange={(e) => update("householdSize", e.target.value)} placeholder="4" className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-border/50 bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">{s.meterType[lang]}</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button type="button" onClick={() => setMeterType("dual")} className={`flex items-center gap-2 p-3 rounded-xl border text-sm font-medium transition-all ${meterType === "dual" ? "border-primary bg-primary/10 text-primary" : "border-border/50 bg-card text-muted-foreground hover:border-primary/30"}`}>
                      <Gauge className="w-4 h-4" /> {s.meterDual[lang]}
                    </button>
                    <button type="button" onClick={() => setMeterType("single")} className={`flex items-center gap-2 p-3 rounded-xl border text-sm font-medium transition-all ${meterType === "single" ? "border-primary bg-primary/10 text-primary" : "border-border/50 bg-card text-muted-foreground hover:border-primary/30"}`}>
                      <Gauge className="w-4 h-4" /> {s.meterSingle[lang]}
                    </button>
                  </div>
                </div>
              </>
            )}

            <button type="submit" disabled={loading} className="btn-primary-eco w-full mt-2 flex items-center justify-center gap-2">
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {isLogin ? (lang === "sq" ? "Kyçu" : "Log In") : s.submitBtn[lang]}
            </button>

            {!isLogin && <p className="text-xs text-center text-muted-foreground">{s.terms[lang]}</p>}

            <p className="text-sm text-center text-muted-foreground">
              {isLogin
                ? (lang === "sq" ? "Nuk keni llogari? " : "Don't have an account? ")
                : s.alreadyAccount[lang] + " "}
              <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-primary font-medium hover:underline">
                {isLogin ? (lang === "sq" ? "Regjistrohu" : "Sign Up") : s.logIn[lang]}
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
