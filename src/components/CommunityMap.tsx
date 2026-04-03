import { useState } from "react";
import SectionWrapper from "./SectionWrapper";
import { useLanguage } from "@/i18n/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import { useCommunityReports, useAddCommunityReport } from "@/hooks/useEnergy";
import { MapPin, Users, AlertTriangle, Loader2 } from "lucide-react";
import { toast } from "sonner";

const CommunityMap = () => {
  const { lang, t } = useLanguage();
  const c = t.community;
  const { user } = useAuth();
  const { data: reports } = useCommunityReports();
  const addReport = useAddCommunityReport();
  const [showForm, setShowForm] = useState(false);
  const [reportArea, setReportArea] = useState("");
  const [reportDesc, setReportDesc] = useState("");

  // Aggregate reports by area
  const areaMap = new Map<string, { count: number; status: string }>();
  (reports || []).forEach((r) => {
    const existing = areaMap.get(r.area);
    if (existing) {
      existing.count++;
    } else {
      areaMap.set(r.area, { count: 1, status: r.status });
    }
  });
  const areas = Array.from(areaMap.entries()).sort((a, b) => b[1].count - a[1].count).slice(0, 4);

  // Fallback if no data
  const displayAreas = areas.length > 0
    ? areas.map(([area, info]) => ({
        area: { sq: area, en: area },
        count: info.count,
        status: info.status === "confirmed" ? { sq: "I konfirmuar", en: "Confirmed" }
          : info.status === "reviewing" ? { sq: "Në shqyrtim", en: "Reviewing" }
          : { sq: "Në pritje", en: "Pending" },
        severity: info.status === "confirmed" ? 0 : info.status === "reviewing" ? 1 : 2,
      }))
    : c.areas.map((r, i) => ({
        area: r.area,
        count: [12, 8, 5, 3][i],
        status: r.status,
        severity: i,
      }));

  // Generate heatmap intensity from reports
  const gridIntensities = [0.1, 0.3, 0.05, 0.6, 0.15, 0.4, 0.08, 0.5, 0.2];
  if (reports && reports.length > 0) {
    const maxCount = Math.max(...areas.map(([, info]) => info.count), 1);
    areas.forEach(([, info], i) => {
      if (i < 9) gridIntensities[i] = info.count / maxCount;
    });
  }

  const handleSubmitReport = () => {
    if (!reportArea.trim()) return;
    addReport.mutate(
      { area: reportArea, description: reportDesc || undefined },
      {
        onSuccess: () => {
          toast.success(lang === "sq" ? "Raporti u dërgua" : "Report submitted");
          setShowForm(false);
          setReportArea("");
          setReportDesc("");
        },
      }
    );
  };

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
              {gridIntensities.map((intensity, i) => (
                <div key={i} className="aspect-square rounded-xl flex items-center justify-center" style={{ background: `hsl(var(--destructive) / ${intensity})` }}>
                  {intensity > 0.3 && <MapPin className="w-4 h-4 text-destructive" />}
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-4 text-center">
              {reports ? `${reports.length} ${lang === "sq" ? "raporte gjithsej" : "total reports"}` : c.simulated[lang]}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" /> {c.areaReports[lang]}
          </h3>
          {displayAreas.map((r, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-card">
              <div>
                <p className="text-sm font-medium text-foreground">{typeof r.area === "object" ? r.area[lang] : r.area}</p>
                <p className="text-xs text-muted-foreground">{r.count} {c.reportsSubmitted[lang]}</p>
              </div>
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                r.severity === 0 ? "bg-destructive/10 text-destructive" :
                r.severity === 1 ? "bg-eco-warning/10 text-eco-warning" :
                "bg-muted text-muted-foreground"
              }`}>{typeof r.status === "object" ? r.status[lang] : r.status}</span>
            </div>
          ))}

          {showForm && user ? (
            <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 space-y-3">
              <input type="text" placeholder={lang === "sq" ? "Zona (p.sh. Dardani)" : "Area (e.g. Dardani)"} value={reportArea} onChange={(e) => setReportArea(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border/50 bg-card text-sm text-foreground" />
              <textarea placeholder={lang === "sq" ? "Përshkrim (opsionale)" : "Description (optional)"} value={reportDesc} onChange={(e) => setReportDesc(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border/50 bg-card text-sm text-foreground h-20 resize-none" />
              <div className="flex gap-2">
                <button onClick={handleSubmitReport} disabled={addReport.isPending} className="btn-primary-eco text-sm py-2 px-4 flex-1">
                  {addReport.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : (lang === "sq" ? "Dërgo" : "Submit")}
                </button>
                <button onClick={() => setShowForm(false)} className="btn-outline-eco text-sm py-2 px-4">{lang === "sq" ? "Anulo" : "Cancel"}</button>
              </div>
            </div>
          ) : (
            <button onClick={() => user ? setShowForm(true) : toast.info(lang === "sq" ? "Kyçu për të raportuar" : "Sign in to report")} className="btn-outline-eco w-full text-sm py-3 mt-2">
              <AlertTriangle className="w-4 h-4" /> {c.reportBtn[lang]}
            </button>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default CommunityMap;
