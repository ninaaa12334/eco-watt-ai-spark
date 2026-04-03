import { useState, useRef } from "react";
import SectionWrapper from "./SectionWrapper";
import { useLanguage } from "@/i18n/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import { useDevices, useAddDevice, useUpdateDevice, useDeleteDevice, useRecognizeDevice, useUploadDevicePhoto, useCalculateEnergy } from "@/hooks/useEnergy";
import { Camera, PenLine, Tv, Wind, Smartphone, CheckCircle, Plus, Trash2, Edit2, Loader2, X, Zap } from "lucide-react";
import { toast } from "sonner";

const DEVICE_TYPES = ["tv", "ac", "heater", "fridge", "washing_machine", "charger", "laptop", "boiler", "console", "light", "fan", "microwave", "oven", "other"];
const ROOMS = ["Dhoma e ndenjës", "Dhoma e gjumit", "Kuzhina", "Banjo", "Zyra", "Korridori", "Garazhi"];

const SmartApplianceSetup = () => {
  const { lang, t } = useLanguage();
  const a = t.applianceSetup;
  const { user } = useAuth();
  const { data: devices, isLoading } = useDevices();
  const addDevice = useAddDevice();
  const updateDev = useUpdateDevice();
  const deleteDev = useDeleteDevice();
  const recognizeDev = useRecognizeDevice();
  const uploadPhoto = useUploadDevicePhoto();
  const calcEnergy = useCalculateEnergy();

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", category: "tv", brand: "", model: "", room: ROOMS[0], power_watts: "100", daily_usage_hours: "4", standby_watts: "0", is_standby: false });
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [recognizing, setRecognizing] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const resetForm = () => {
    setForm({ name: "", category: "tv", brand: "", model: "", room: ROOMS[0], power_watts: "100", daily_usage_hours: "4", standby_watts: "0", is_standby: false });
    setPhotoPreview(null);
    setEditingId(null);
    setShowForm(false);
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (ev) => {
      const base64 = (ev.target?.result as string).split(",")[1];
      setPhotoPreview(ev.target?.result as string);
      setRecognizing(true);

      try {
        // Upload photo
        let photoUrl: string | undefined;
        if (user) {
          photoUrl = await uploadPhoto.mutateAsync(file);
        }

        // Recognize device
        const result = await recognizeDev.mutateAsync({ imageBase64: base64 });
        setForm((prev) => ({
          ...prev,
          name: `${result.brand} ${result.device_type}`.trim(),
          category: result.device_type || prev.category,
          brand: result.brand || prev.brand,
          model: result.model || prev.model,
          power_watts: String(result.estimated_watts || prev.power_watts),
          standby_watts: String(result.estimated_standby_watts || prev.standby_watts),
        }));
        toast.success(
          lang === "sq"
            ? `Pajisja u identifikua: ${result.device_type} (${result.confidence}% besueshmëri)`
            : `Device identified: ${result.device_type} (${result.confidence}% confidence)`
        );
      } catch (err: any) {
        toast.error(lang === "sq" ? "Gabim në identifikim" : "Recognition error");
      }
      setRecognizing(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    if (!form.name.trim()) {
      toast.error(lang === "sq" ? "Emri i pajisjes kërkohet" : "Device name is required");
      return;
    }

    const deviceData = {
      name: form.name,
      category: form.category,
      brand: form.brand || undefined,
      model: form.model || undefined,
      room: form.room,
      power_watts: Number(form.power_watts) || 100,
      daily_usage_hours: Number(form.daily_usage_hours) || 4,
      standby_watts: Number(form.standby_watts) || 0,
      is_standby: form.is_standby,
    };

    try {
      if (editingId) {
        await updateDev.mutateAsync({ id: editingId, updates: deviceData });
        toast.success(lang === "sq" ? "Pajisja u përditësua" : "Device updated");
      } else {
        await addDevice.mutateAsync(deviceData);
        toast.success(lang === "sq" ? "Pajisja u shtua" : "Device added");
      }
      resetForm();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const startEdit = (dev: any) => {
    setForm({
      name: dev.name, category: dev.category, brand: dev.brand || "", model: dev.model || "",
      room: dev.room || ROOMS[0], power_watts: String(dev.power_watts), daily_usage_hours: String(dev.daily_usage_hours || 4),
      standby_watts: String(dev.standby_watts || 0), is_standby: dev.is_standby || false,
    });
    setEditingId(dev.id);
    setShowForm(true);
  };

  const handleRecalculate = async () => {
    try {
      await calcEnergy.mutateAsync();
      toast.success(lang === "sq" ? "Kalkulimet u rifreskuan" : "Calculations refreshed");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <SectionWrapper id="appliance-setup" className="bg-muted/30">
      <div className="text-center mb-14">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">{a.label[lang]}</span>
        <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 text-foreground">{a.title[lang]}</h2>
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">{a.desc[lang]}</p>
      </div>

      {!user ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground">{lang === "sq" ? "Kyçu për të menaxhuar pajisjet" : "Sign in to manage devices"}</p>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Action buttons */}
          <div className="flex flex-wrap gap-3">
            <button onClick={() => { resetForm(); setShowForm(true); }} className="btn-primary-eco text-sm">
              <Plus className="w-4 h-4" /> {lang === "sq" ? "Shto pajisje" : "Add Device"}
            </button>
            <button onClick={() => fileRef.current?.click()} className="btn-outline-eco text-sm">
              <Camera className="w-4 h-4" /> {lang === "sq" ? "Foto pajisje" : "Photo Input"}
            </button>
            {devices && devices.length > 0 && (
              <button onClick={handleRecalculate} disabled={calcEnergy.isPending} className="btn-outline-eco text-sm ml-auto">
                {calcEnergy.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                {lang === "sq" ? "Rillogarit" : "Recalculate"}
              </button>
            )}
            <input ref={fileRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handlePhotoUpload} />
          </div>

          {/* Add/Edit Form */}
          {showForm && (
            <div className="glass-card p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-semibold text-foreground">
                  {editingId ? (lang === "sq" ? "Ndrysho pajisjen" : "Edit Device") : (lang === "sq" ? "Shto pajisje të re" : "Add New Device")}
                </h3>
                <button onClick={resetForm} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
              </div>

              {recognizing && (
                <div className="flex items-center gap-3 p-4 rounded-xl bg-primary/5 border border-primary/20 mb-4">
                  <Loader2 className="w-5 h-5 text-primary animate-spin" />
                  <span className="text-sm text-foreground">{lang === "sq" ? "Duke identifikuar pajisjen..." : "Identifying device..."}</span>
                </div>
              )}

              {photoPreview && (
                <div className="mb-4">
                  <img src={photoPreview} alt="Device" className="w-32 h-32 object-cover rounded-xl border border-border/50" />
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">{lang === "sq" ? "Emri" : "Name"} *</label>
                  <input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} className="w-full px-3 py-2.5 rounded-xl border border-border/50 bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">{lang === "sq" ? "Lloji" : "Type"}</label>
                  <select value={form.category} onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))} className="w-full px-3 py-2.5 rounded-xl border border-border/50 bg-card text-sm text-foreground">
                    {DEVICE_TYPES.map((t) => <option key={t} value={t}>{t.replace("_", " ")}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">{lang === "sq" ? "Marka" : "Brand"}</label>
                  <input value={form.brand} onChange={(e) => setForm((p) => ({ ...p, brand: e.target.value }))} className="w-full px-3 py-2.5 rounded-xl border border-border/50 bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">{lang === "sq" ? "Modeli" : "Model"}</label>
                  <input value={form.model} onChange={(e) => setForm((p) => ({ ...p, model: e.target.value }))} className="w-full px-3 py-2.5 rounded-xl border border-border/50 bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">{lang === "sq" ? "Dhoma" : "Room"}</label>
                  <select value={form.room} onChange={(e) => setForm((p) => ({ ...p, room: e.target.value }))} className="w-full px-3 py-2.5 rounded-xl border border-border/50 bg-card text-sm text-foreground">
                    {ROOMS.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Watts</label>
                  <input type="number" value={form.power_watts} onChange={(e) => setForm((p) => ({ ...p, power_watts: e.target.value }))} className="w-full px-3 py-2.5 rounded-xl border border-border/50 bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">{lang === "sq" ? "Orë/ditë" : "Hours/day"}</label>
                  <input type="number" value={form.daily_usage_hours} onChange={(e) => setForm((p) => ({ ...p, daily_usage_hours: e.target.value }))} className="w-full px-3 py-2.5 rounded-xl border border-border/50 bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">{lang === "sq" ? "Standby watts" : "Standby watts"}</label>
                  <input type="number" value={form.standby_watts} onChange={(e) => setForm((p) => ({ ...p, standby_watts: e.target.value }))} className="w-full px-3 py-2.5 rounded-xl border border-border/50 bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
              </div>

              <div className="flex items-center gap-3 mt-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.is_standby} onChange={(e) => setForm((p) => ({ ...p, is_standby: e.target.checked }))} className="rounded border-border" />
                  <span className="text-sm text-foreground">{lang === "sq" ? "Mbetet në standby" : "Stays on standby"}</span>
                </label>
              </div>

              <button onClick={handleSave} disabled={addDevice.isPending || updateDev.isPending} className="btn-primary-eco w-full mt-4">
                {(addDevice.isPending || updateDev.isPending) ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                {editingId ? (lang === "sq" ? "Ruaj ndryshimet" : "Save Changes") : (lang === "sq" ? "Shto pajisjen" : "Add Device")}
              </button>
            </div>
          )}

          {/* Device List */}
          {isLoading ? (
            <div className="flex justify-center py-10"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
          ) : devices && devices.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {devices.map((dev) => (
                <div key={dev.id} className={`glass-card p-5 rounded-xl ${dev.waste_detected ? "border-destructive/30" : ""}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-display font-semibold text-foreground text-sm">{dev.name}</h4>
                      <p className="text-xs text-muted-foreground">{dev.room} · {dev.category}</p>
                    </div>
                    <div className="flex gap-1">
                      <button onClick={() => startEdit(dev)} className="p-1.5 rounded-lg hover:bg-muted"><Edit2 className="w-3.5 h-3.5 text-muted-foreground" /></button>
                      <button onClick={() => { deleteDev.mutate(dev.id); toast.success(lang === "sq" ? "U fshi" : "Deleted"); }} className="p-1.5 rounded-lg hover:bg-destructive/10"><Trash2 className="w-3.5 h-3.5 text-destructive" /></button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2 rounded-lg bg-muted/50"><span className="text-muted-foreground">Watts:</span> <span className="font-semibold text-foreground">{dev.power_watts}W</span></div>
                    <div className="p-2 rounded-lg bg-muted/50"><span className="text-muted-foreground">{lang === "sq" ? "Orë" : "Hours"}:</span> <span className="font-semibold text-foreground">{dev.daily_usage_hours}h</span></div>
                  </div>
                  {dev.waste_detected && (
                    <div className="mt-3 p-2 rounded-lg bg-destructive/5 border border-destructive/20 text-xs text-destructive">
                      ⚠ {dev.waste_reason || (lang === "sq" ? "Humbje e detektuar" : "Waste detected")}
                    </div>
                  )}
                  {dev.waste_kwh > 0 && (
                    <div className="mt-2 text-xs text-muted-foreground">
                      {lang === "sq" ? "Humbje" : "Waste"}: {dev.waste_kwh} kWh/{lang === "sq" ? "ditë" : "day"}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-card p-8 text-center rounded-2xl">
              <PenLine className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">{lang === "sq" ? "Nuk keni pajisje ende. Shtoni pajisjen e parë!" : "No devices yet. Add your first device!"}</p>
            </div>
          )}
        </div>
      )}
    </SectionWrapper>
  );
};

export default SmartApplianceSetup;
