import SectionWrapper from "./SectionWrapper";
import { useLanguage } from "@/i18n/LanguageContext";
import { MapPin, Users, AlertTriangle } from "lucide-react";

const reportCounts = [12, 8, 5, 3];

const CommunityMap = () => {
  const { lang, t } = useLanguage();
  const c = t.community;

  return (
    <SectionWrapper id="community-map">
      <div className="text-center mb-14">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">{c.label[lang]}</span>
        <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 text-foreground">{c.title[lang]}</h2>
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">{c.desc[lang]}</p>
      </div>

      <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-8">
        <div className="glass-card p-8 rounded-2xl relative overflow-hidden" style={{ minHeight: 320 }}>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
          <div className="relative z-10">
            <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" /> {c.heatmap[lang]}
            </h3>
            <div className="grid grid-cols-3 gap-3 mt-6">
              {[...Array(9)].map((_, i) => {
                const intensity = [0.1, 0.3, 0.05, 0.6, 0.15, 0.4, 0.08, 0.5, 0.2][i];
                return (
                  <div key={i} className="aspect-square rounded-xl flex items-center justify-center" style={{ background: `hsl(var(--destructive) / ${intensity})` }}>
                    {intensity > 0.3 && <MapPin className="w-4 h-4 text-destructive" />}
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-muted-foreground mt-4 text-center">{c.simulated[lang]}</p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" /> {c.areaReports[lang]}
          </h3>
          {c.areas.map((r, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-card">
              <div>
                <p className="text-sm font-medium text-foreground">{r.area[lang]}</p>
                <p className="text-xs text-muted-foreground">{reportCounts[i]} {c.reportsSubmitted[lang]}</p>
              </div>
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                i === 0 ? "bg-destructive/10 text-destructive" :
                i === 1 ? "bg-eco-warning/10 text-eco-warning" :
                "bg-muted text-muted-foreground"
              }`}>{r.status[lang]}</span>
            </div>
          ))}
          <button className="btn-outline-eco w-full text-sm py-3 mt-2">
            <AlertTriangle className="w-4 h-4" /> {c.reportBtn[lang]}
          </button>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default CommunityMap;
