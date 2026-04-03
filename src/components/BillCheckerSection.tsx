import { useState, useRef } from "react";
import SectionWrapper from "./SectionWrapper";
import { useLanguage } from "@/i18n/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import { useBills, useAddBill, useAnalyzeBill, useUploadBillFile } from "@/hooks/useEnergy";
import { useHousehold } from "@/hooks/useHousehold";
import { FileSearch, Upload, Sun, Moon, AlertTriangle, CheckCircle, Loader2, X } from "lucide-react";
import { toast } from "sonner";

const BillCheckerSection = () => {
  const { lang, t } = useLanguage();
  const b = t.billChecker;
  const { user } = useAuth();
  const { data: bills } = useBills();
  const addBill = useAddBill();
  const analyzeMut = useAnalyzeBill();
  const uploadBill = useUploadBillFile();
  const fileRef = useRef<HTMLInputElement>(null);

  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [manualForm, setManualForm] = useState({ total_kwh: "", day_kwh: "", night_kwh: "", total_cost: "", month: "", year: String(new Date().getFullYear()) });
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadedFile(file);

    // If it's an image, try AI OCR analysis
    if (file.type.startsWith("image/")) {
      setAnalyzing(true);
      const reader = new FileReader();
      reader.onload = async (ev) => {
        const base64 = (ev.target?.result as string).split(",")[1];
        try {
          const previousBills = bills?.map((b) => ({ total_kwh: b.total_kwh || 0 })) || [];
          const result = await analyzeMut.mutateAsync({
            image_base64: base64,
            meter_type: "dual",
            previous_bills: previousBills,
          });
          setAnalysisResult(result);
          toast.success(lang === "sq" ? "Fatura u analizua" : "Bill analyzed");
        } catch (err: any) {
          toast.error(err.message);
        }
        setAnalyzing(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleManualAnalysis = async () => {
    if (!manualForm.total_kwh) {
      toast.error(lang === "sq" ? "Vendosni kWh totale" : "Enter total kWh");
      return;
    }
    setAnalyzing(true);
    try {
      const previousBills = bills?.map((b) => ({ total_kwh: b.total_kwh || 0 })) || [];
      const result = await analyzeMut.mutateAsync({
        total_kwh: Number(manualForm.total_kwh),
        day_kwh: Number(manualForm.day_kwh) || undefined,
        night_kwh: Number(manualForm.night_kwh) || undefined,
        total_cost: Number(manualForm.total_cost) || undefined,
        meter_type: "dual",
        previous_bills: previousBills,
      });
      setAnalysisResult(result);

      // Save bill to DB
      if (user && manualForm.month) {
        await addBill.mutateAsync({
          month: manualForm.month,
          year: Number(manualForm.year),
          total_kwh: Number(manualForm.total_kwh),
          day_kwh: Number(manualForm.day_kwh) || undefined,
          night_kwh: Number(manualForm.night_kwh) || undefined,
          total_cost_eur: Number(manualForm.total_cost) || undefined,
          day_cost_eur: result?.analysis?.expected_cost ? result.analysis.expected_cost * 0.65 : undefined,
          night_cost_eur: result?.analysis?.expected_cost ? result.analysis.expected_cost * 0.35 : undefined,
          is_anomaly: result?.analysis?.status !== "normal",
          anomaly_reason: result?.analysis?.anomalies?.join("; ") || undefined,
        });
      }

      toast.success(lang === "sq" ? "Analiza përfundoi" : "Analysis complete");
    } catch (err: any) {
      toast.error(err.message);
    }
    setAnalyzing(false);
  };

  const analysis = analysisResult?.analysis;
  const recs = analysisResult?.recommendations || [];

  return (
    <SectionWrapper id="bill-checker" className="bg-muted/30">
      <div className="text-center mb-14">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">{b.label[lang]}</span>
        <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 text-foreground">{b.title[lang]}</h2>
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">{b.desc[lang]}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Upload & Input */}
        <div className="glass-card p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-primary/10">
              <Upload className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-display text-lg font-semibold text-foreground">{b.uploadTitle[lang]}</h3>
          </div>

          {/* File upload */}
          <div
            onClick={() => user ? fileRef.current?.click() : toast.info(lang === "sq" ? "Kyçu për të ngarkuar" : "Sign in to upload")}
            className="border-2 border-dashed border-primary/30 rounded-xl p-8 text-center bg-primary/5 cursor-pointer hover:border-primary/50 transition-colors mb-5"
          >
            {analyzing ? (
              <Loader2 className="w-10 h-10 text-primary mx-auto mb-3 animate-spin" />
            ) : (
              <FileSearch className="w-10 h-10 text-primary mx-auto mb-3" />
            )}
            <p className="text-sm font-medium text-foreground mb-1">{uploadedFile ? uploadedFile.name : b.dropText[lang]}</p>
            <p className="text-xs text-muted-foreground">{b.dropDesc[lang]}</p>
          </div>
          <input ref={fileRef} type="file" accept="image/*,.pdf" className="hidden" onChange={handleFileUpload} />

          {/* Manual entry */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">{lang === "sq" ? "Ose vendosni manualisht:" : "Or enter manually:"}</h4>
            <div className="grid grid-cols-2 gap-3">
              <input type="number" placeholder="kWh totale" value={manualForm.total_kwh} onChange={(e) => setManualForm((p) => ({ ...p, total_kwh: e.target.value }))} className="px-3 py-2.5 rounded-xl border border-border/50 bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
              <input type="number" placeholder="€ totale" value={manualForm.total_cost} onChange={(e) => setManualForm((p) => ({ ...p, total_cost: e.target.value }))} className="px-3 py-2.5 rounded-xl border border-border/50 bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
              <input type="number" placeholder={lang === "sq" ? "kWh ditë" : "Day kWh"} value={manualForm.day_kwh} onChange={(e) => setManualForm((p) => ({ ...p, day_kwh: e.target.value }))} className="px-3 py-2.5 rounded-xl border border-border/50 bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
              <input type="number" placeholder={lang === "sq" ? "kWh natë" : "Night kWh"} value={manualForm.night_kwh} onChange={(e) => setManualForm((p) => ({ ...p, night_kwh: e.target.value }))} className="px-3 py-2.5 rounded-xl border border-border/50 bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
              <select value={manualForm.month} onChange={(e) => setManualForm((p) => ({ ...p, month: e.target.value }))} className="px-3 py-2.5 rounded-xl border border-border/50 bg-card text-sm text-foreground">
                <option value="">{lang === "sq" ? "Muaji" : "Month"}</option>
                {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
              <input type="number" placeholder={lang === "sq" ? "Viti" : "Year"} value={manualForm.year} onChange={(e) => setManualForm((p) => ({ ...p, year: e.target.value }))} className="px-3 py-2.5 rounded-xl border border-border/50 bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <button onClick={handleManualAnalysis} disabled={analyzing} className="btn-primary-eco w-full">
              {analyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileSearch className="w-4 h-4" />}
              {lang === "sq" ? "Analizo faturën" : "Analyze Bill"}
            </button>
          </div>

          {/* Tariff summary */}
          {analysis && (
            <div className="grid grid-cols-2 gap-3 mt-5">
              <div className="p-4 rounded-xl bg-eco-warning/10">
                <Sun className="w-5 h-5 text-eco-warning mb-2" />
                <div className="text-xs text-muted-foreground">{b.dayTariff[lang]}</div>
                <div className="text-lg font-bold font-display text-foreground">€{(analysis.day_kwh * 0.0905).toFixed(2)}</div>
                <div className="text-xs text-muted-foreground">{analysis.day_kwh?.toFixed(0)} kWh</div>
              </div>
              <div className="p-4 rounded-xl bg-secondary/10">
                <Moon className="w-5 h-5 text-secondary mb-2" />
                <div className="text-xs text-muted-foreground">{b.nightTariff[lang]}</div>
                <div className="text-lg font-bold font-display text-foreground">€{(analysis.night_kwh * 0.0388).toFixed(2)}</div>
                <div className="text-xs text-muted-foreground">{analysis.night_kwh?.toFixed(0)} kWh</div>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="glass-card p-8">
          <h3 className="font-display text-lg font-semibold text-foreground mb-6">{b.aiAnalysis[lang]}</h3>

          {analysis ? (
            <div className="space-y-3">
              {/* Status */}
              <div className={`p-4 rounded-xl border ${analysis.status === "normal" ? "border-eco-success/30 bg-eco-success/5" : analysis.status === "suspicious" ? "border-destructive/30 bg-destructive/5" : "border-eco-warning/30 bg-eco-warning/5"}`}>
                {analysis.status === "normal" ? <CheckCircle className="w-5 h-5 text-eco-success mb-2" /> : <AlertTriangle className="w-5 h-5 text-eco-warning mb-2" />}
                <p className="text-sm font-semibold text-foreground">
                  {analysis.status === "normal" ? (lang === "sq" ? "Fatura duket normale" : "Bill looks normal") :
                   analysis.status === "suspicious" ? (lang === "sq" ? "Devijim i dyshimtë i detektuar" : "Suspicious deviation detected") :
                   (lang === "sq" ? "Rishikim i rekomanduar" : "Review recommended")}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {lang === "sq" ? `Kosto e pritur: €${analysis.expected_cost} | Raporti ditë/natë: ${analysis.day_night_ratio}` :
                   `Expected cost: €${analysis.expected_cost} | Day/night ratio: ${analysis.day_night_ratio}`}
                </p>
              </div>

              {/* Anomalies */}
              {analysis.anomalies?.map((a: string, i: number) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-eco-warning/30 bg-eco-warning/5">
                  <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0 text-eco-warning" />
                  <p className="text-sm text-foreground">{a}</p>
                </div>
              ))}

              {/* Recommendations */}
              {recs.map((r: any, i: number) => (
                <div key={i} className={`flex items-start gap-3 p-4 rounded-xl border ${r.priority === "high" ? "border-destructive/30 bg-destructive/5" : "border-primary/20 bg-primary/5"}`}>
                  <CheckCircle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${r.priority === "high" ? "text-destructive" : "text-primary"}`} />
                  <p className="text-sm text-foreground">{lang === "sq" ? r.text_sq : r.text_en}</p>
                </div>
              ))}

              {/* Cost comparison */}
              <div className="mt-4 p-4 rounded-xl border border-primary/20 bg-primary/5">
                <p className="text-sm font-medium text-foreground">
                  {b.verdict[lang]}: <span className={`font-semibold ${analysis.status === "normal" ? "text-eco-success" : "text-eco-warning"}`}>
                    {analysis.status === "normal" ? (lang === "sq" ? "Normale" : "Normal") : b.reviewRecommended[lang]}
                  </span>
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {lang === "sq"
                    ? `Devijimi: ${analysis.deviation_pct > 0 ? "+" : ""}${analysis.deviation_pct}% nga kosto e pritur`
                    : `Deviation: ${analysis.deviation_pct > 0 ? "+" : ""}${analysis.deviation_pct}% from expected cost`}
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {b.results.map((r: any, i: number) => (
                <div key={i} className={`flex items-start gap-3 p-4 rounded-xl border ${r.status === "warning" ? "border-eco-warning/30 bg-eco-warning/5" : "border-eco-success/30 bg-eco-success/5"}`}>
                  {r.status === "warning" ? <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0 text-eco-warning" /> : <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0 text-eco-success" />}
                  <p className="text-sm text-foreground">{r.text[lang]}</p>
                </div>
              ))}
              <div className="mt-5 p-4 rounded-xl border border-primary/20 bg-primary/5">
                <p className="text-sm font-medium text-foreground">{b.verdict[lang]}: <span className="text-eco-warning font-semibold">{b.reviewRecommended[lang]}</span></p>
                <p className="text-xs text-muted-foreground mt-1">{b.verdictDesc[lang]}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default BillCheckerSection;
