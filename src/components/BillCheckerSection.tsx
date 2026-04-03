import { useState, useRef } from "react";
import SectionWrapper from "./SectionWrapper";
import { useLanguage } from "@/i18n/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import {
  useBills,
  useAddBill,
  useAnalyzeBill,
  useUploadBillFile,
  useTariffChecks,
  useAddTariffCheck,
} from "@/hooks/useEnergy";
import { FileSearch, Upload, Sun, Moon, AlertTriangle, CheckCircle, Loader2, Clock } from "lucide-react";
import { toast } from "sonner";

const BillCheckerSection = () => {
  const { lang, t } = useLanguage();
  const b = t.billChecker;
  const { user } = useAuth();
  const { data: bills } = useBills();
  const { data: tariffChecks } = useTariffChecks();
  const addTariffCheck = useAddTariffCheck();
  const addBill = useAddBill();
  const analyzeMut = useAnalyzeBill();
  const uploadBill = useUploadBillFile();
  const fileRef = useRef<HTMLInputElement>(null);

  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [manualForm, setManualForm] = useState({ total_kwh: "", day_kwh: "", night_kwh: "", total_cost: "", month: "", year: String(new Date().getFullYear()) });
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [tariffTime, setTariffTime] = useState("");
  const [tariffActual, setTariffActual] = useState<"day" | "night">("night");

  const logs =
    tariffChecks && tariffChecks.length > 0
      ? tariffChecks.map((c) => ({
          time: c.check_time.slice(0, 5),
          expectedKey: c.expected_tariff as "day" | "night",
          actualKey: c.actual_tariff as "day" | "night",
          ok: c.is_correct,
        }))
      : [];

  const incorrectCount = logs.filter((l) => !l.ok).length;

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

      {!user && (
        <div className="max-w-2xl mx-auto mb-10 glass-card p-5 rounded-2xl text-center">
          <p className="text-sm text-muted-foreground mb-2">
            {lang === "sq"
              ? "Ju lutem kyçuni për të ngarkuar dhe analizuar faturat dhe për të verifikuar tarifat ditë/natë."
              : "Please sign in to upload and analyze bills and to verify your day/night tariff behavior."}
          </p>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Upload & Input */}
        <div className="glass-card p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-primary/10">
              <Upload className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-display text-lg font-semibold text-foreground">{b.uploadTitle[lang]}</h3>
          </div>

          {user && (
            <>
              {/* File upload */}
              <div
                onClick={() => fileRef.current?.click()}
                className="border-2 border-dashed border-primary/30 rounded-xl p-8 text-center bg-primary/5 cursor-pointer hover:border-primary/50 transition-colors mb-5"
              >
                {analyzing ? (
                  <Loader2 className="w-10 h-10 text-primary mx-auto mb-3 animate-spin" />
                ) : (
                  <FileSearch className="w-10 h-10 text-primary mx-auto mb-3" />
                )}
                <p className="text-sm font-medium text-foreground mb-1">
                  {uploadedFile ? uploadedFile.name : b.dropText[lang]}
                </p>
                <p className="text-xs text-muted-foreground">{b.dropDesc[lang]}</p>
              </div>
              <input ref={fileRef} type="file" accept="image/*,.pdf" className="hidden" onChange={handleFileUpload} />

              {/* Manual entry */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-foreground">
                  {lang === "sq" ? "Ose vendosni manualisht:" : "Or enter manually:"}
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    placeholder="kWh totale"
                    value={manualForm.total_kwh}
                    onChange={(e) => setManualForm((p) => ({ ...p, total_kwh: e.target.value }))}
                    className="px-3 py-2.5 rounded-xl border border-border/50 bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                  <input
                    type="number"
                    placeholder="€ totale"
                    value={manualForm.total_cost}
                    onChange={(e) => setManualForm((p) => ({ ...p, total_cost: e.target.value }))}
                    className="px-3 py-2.5 rounded-xl border border-border/50 bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                  <input
                    type="number"
                    placeholder={lang === "sq" ? "kWh ditë" : "Day kWh"}
                    value={manualForm.day_kwh}
                    onChange={(e) => setManualForm((p) => ({ ...p, day_kwh: e.target.value }))}
                    className="px-3 py-2.5 rounded-xl border border-border/50 bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                  <input
                    type="number"
                    placeholder={lang === "sq" ? "kWh natë" : "Night kWh"}
                    value={manualForm.night_kwh}
                    onChange={(e) => setManualForm((p) => ({ ...p, night_kwh: e.target.value }))}
                    className="px-3 py-2.5 rounded-xl border border-border/50 bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                  <select
                    value={manualForm.month}
                    onChange={(e) => setManualForm((p) => ({ ...p, month: e.target.value }))}
                    className="px-3 py-2.5 rounded-xl border border-border/50 bg-card text-sm text-foreground"
                  >
                    <option value="">{lang === "sq" ? "Muaji" : "Month"}</option>
                    {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    placeholder={lang === "sq" ? "Viti" : "Year"}
                    value={manualForm.year}
                    onChange={(e) => setManualForm((p) => ({ ...p, year: e.target.value }))}
                    className="px-3 py-2.5 rounded-xl border border-border/50 bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
                <button onClick={handleManualAnalysis} disabled={analyzing} className="btn-primary-eco w-full">
                  {analyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileSearch className="w-4 h-4" />}
                  {lang === "sq" ? "Analizo faturën" : "Analyze Bill"}
                </button>
              </div>
            </>
          )}

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

        {/* Results + Day/Night verifier */}
        <div className="glass-card p-8 space-y-8">
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

          <div className="border-t border-border/40 pt-6 mt-2 space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-5 h-5 text-primary" />
              <h4 className="font-display text-md font-semibold text-foreground">
                {lang === "sq" ? "Verifikimi i ndërrimit ditë/natë" : "Day/Night tariff verification"}
              </h4>
            </div>

            {user ? (
              <>
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <input
                    type="time"
                    value={tariffTime}
                    onChange={(e) => setTariffTime(e.target.value)}
                    className="px-3 py-2 rounded-lg border border-border/50 bg-card text-sm text-foreground"
                  />
                  <select
                    value={tariffActual}
                    onChange={(e) => setTariffActual(e.target.value as "day" | "night")}
                    className="px-3 py-2 rounded-lg border border-border/50 bg-card text-sm text-foreground"
                  >
                    <option value="day">{b.dayTariff[lang]}</option>
                    <option value="night">{b.nightTariff[lang]}</option>
                  </select>
                  <button
                    onClick={() => {
                      if (!tariffTime) return;
                      const hour = parseInt(tariffTime.split(":")[0]);
                      const now = new Date();
                      const month = now.getMonth();
                      const isWinter = month >= 9 || month <= 2;
                      const dayStart = isWinter ? 7 : 8;
                      const dayEnd = isWinter ? 22 : 23;
                      const expected = hour >= dayStart && hour < dayEnd ? "day" : "night";
                      const isCorrect = expected === tariffActual;
                      addTariffCheck.mutate(
                        {
                          check_time: tariffTime + ":00",
                          expected_tariff: expected,
                          actual_tariff: tariffActual,
                          is_correct: isCorrect,
                        },
                        {
                          onSuccess: () => {
                            toast.success(
                              lang === "sq"
                                ? "Kontrolli i tarifës u ruajt"
                                : "Tariff check saved"
                            );
                            setTariffTime("");
                          },
                        }
                      );
                    }}
                    disabled={addTariffCheck.isPending}
                    className="btn-primary-eco text-sm py-2 px-4"
                  >
                    {addTariffCheck.isPending ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <FileSearch className="w-4 h-4" />
                    )}
                    {lang === "sq" ? "Regjistro kontrollin" : "Log check"}
                  </button>
                </div>
              </>
            ) : (
              <p className="text-xs text-muted-foreground">
                {lang === "sq"
                  ? "Kyçu për të regjistruar kontrollime të tarifës ditë/natë dhe për të ndjekur problemet e përsëritura."
                  : "Sign in to log day/night tariff checks and track recurring issues."}
              </p>
            )}

            {logs.length > 0 && (
              <div className="space-y-2">
                {logs.slice(0, 4).map((l, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between p-3 rounded-xl border ${
                      l.ok ? "border-eco-success/30 bg-eco-success/5" : "border-destructive/30 bg-destructive/5"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {l.ok ? (
                        <CheckCircle className="w-4 h-4 text-eco-success" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-destructive" />
                      )}
                      <span className="text-sm font-mono font-semibold text-foreground">{l.time}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs">
                      <span className="text-muted-foreground">
                        {lang === "sq" ? "Pritej: " : "Expected: "}
                        <span className="font-medium text-foreground">
                          {l.expectedKey === "day" ? b.dayTariff[lang] : b.nightTariff[lang]}
                        </span>
                      </span>
                      <span className="text-muted-foreground">
                        {lang === "sq" ? "Aktuale: " : "Actual: "}
                        <span
                          className={`font-medium ${
                            l.ok ? "text-eco-success" : "text-destructive"
                          }`}
                        >
                          {l.actualKey === "day" ? b.dayTariff[lang] : b.nightTariff[lang]}
                        </span>
                      </span>
                    </div>
                  </div>
                ))}

                <div className="mt-2 p-3 rounded-xl border border-eco-warning/30 bg-eco-warning/5 text-xs text-muted-foreground">
                  {incorrectCount > 0
                    ? lang === "sq"
                      ? `${incorrectCount} kontrolle të tarifës duken problematike — ia vlen të kontaktoni furnizuesin.`
                      : `${incorrectCount} tariff checks look problematic — consider contacting your provider.`
                    : lang === "sq"
                      ? "Deritani nuk janë gjetur probleme të përsëritura me ndërrimin e tarifës."
                      : "So far no recurring issues with your tariff switching have been detected."}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default BillCheckerSection;
