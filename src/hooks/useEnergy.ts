import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useHousehold } from "./useHousehold";
import { useAuth } from "./useAuth";
import {
  fetchDashboard, fetchDevices, fetchAlerts, fetchRecommendations,
  fetchSavings, fetchHistory, fetchBills, fetchTariffChecks,
  fetchCommunityReports, addDevice, updateDevice, deleteDevice,
  addTariffCheck, addCommunityReport, addBill, performAction,
  calculateEnergy, recognizeDevice, analyzeBill,
  uploadDevicePhoto, uploadBillFile,
} from "@/services/energyService";

export function useDashboard() {
  const { householdId } = useHousehold();
  return useQuery({
    queryKey: ["dashboard", householdId],
    queryFn: () => fetchDashboard(householdId!),
    enabled: !!householdId,
  });
}

export function useDevices() {
  const { householdId } = useHousehold();
  return useQuery({
    queryKey: ["devices", householdId],
    queryFn: () => fetchDevices(householdId!),
    enabled: !!householdId,
  });
}

export function useAlerts() {
  const { householdId } = useHousehold();
  return useQuery({
    queryKey: ["alerts", householdId],
    queryFn: () => fetchAlerts(householdId!),
    enabled: !!householdId,
  });
}

export function useRecommendations() {
  const { householdId } = useHousehold();
  return useQuery({
    queryKey: ["recommendations", householdId],
    queryFn: () => fetchRecommendations(householdId!),
    enabled: !!householdId,
  });
}

export function useSavings() {
  const { householdId } = useHousehold();
  return useQuery({
    queryKey: ["savings", householdId],
    queryFn: () => fetchSavings(householdId!),
    enabled: !!householdId,
  });
}

export function useHistory() {
  const { householdId } = useHousehold();
  return useQuery({
    queryKey: ["history", householdId],
    queryFn: () => fetchHistory(householdId!),
    enabled: !!householdId,
  });
}

export function useBills() {
  const { householdId } = useHousehold();
  return useQuery({
    queryKey: ["bills", householdId],
    queryFn: () => fetchBills(householdId!),
    enabled: !!householdId,
  });
}

export function useTariffChecks() {
  const { householdId } = useHousehold();
  return useQuery({
    queryKey: ["tariffChecks", householdId],
    queryFn: () => fetchTariffChecks(householdId!),
    enabled: !!householdId,
  });
}

export function useCommunityReports() {
  return useQuery({ queryKey: ["communityReports"], queryFn: fetchCommunityReports });
}

export function useAddDevice() {
  const qc = useQueryClient();
  const { householdId } = useHousehold();
  return useMutation({
    mutationFn: (device: Omit<Parameters<typeof addDevice>[0], "household_id">) =>
      addDevice({ ...device, household_id: householdId! }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["devices"] }); qc.invalidateQueries({ queryKey: ["dashboard"] }); },
  });
}

export function useUpdateDevice() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Record<string, unknown> }) => updateDevice(id, updates),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["devices"] }); qc.invalidateQueries({ queryKey: ["dashboard"] }); },
  });
}

export function useDeleteDevice() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteDevice,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["devices"] }); qc.invalidateQueries({ queryKey: ["dashboard"] }); },
  });
}

export function useAddTariffCheck() {
  const qc = useQueryClient();
  const { householdId } = useHousehold();
  return useMutation({
    mutationFn: (check: Omit<Parameters<typeof addTariffCheck>[0], "household_id">) =>
      addTariffCheck({ ...check, household_id: householdId! }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["tariffChecks"] }),
  });
}

export function useAddCommunityReport() {
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: (report: Omit<Parameters<typeof addCommunityReport>[0], "user_id">) =>
      addCommunityReport({ ...report, user_id: user!.id }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["communityReports"] }),
  });
}

export function useAddBill() {
  const qc = useQueryClient();
  const { householdId } = useHousehold();
  return useMutation({
    mutationFn: (bill: Omit<Parameters<typeof addBill>[0], "household_id">) =>
      addBill({ ...bill, household_id: householdId! }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["bills"] }); qc.invalidateQueries({ queryKey: ["dashboard"] }); },
  });
}

export function usePerformAction() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: performAction,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["dashboard"] });
      qc.invalidateQueries({ queryKey: ["devices"] });
      qc.invalidateQueries({ queryKey: ["savings"] });
    },
  });
}

export function useCalculateEnergy() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: calculateEnergy,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["dashboard"] });
      qc.invalidateQueries({ queryKey: ["devices"] });
      qc.invalidateQueries({ queryKey: ["savings"] });
      qc.invalidateQueries({ queryKey: ["recommendations"] });
      qc.invalidateQueries({ queryKey: ["alerts"] });
    },
  });
}

export function useRecognizeDevice() {
  return useMutation({
    mutationFn: ({ imageUrl, imageBase64 }: { imageUrl?: string; imageBase64?: string }) =>
      recognizeDevice(imageUrl, imageBase64),
  });
}

export function useAnalyzeBill() {
  return useMutation({ mutationFn: analyzeBill });
}

export function useUploadDevicePhoto() {
  const { user } = useAuth();
  return useMutation({
    mutationFn: (file: File) => uploadDevicePhoto(user!.id, file),
  });
}

export function useUploadBillFile() {
  const { user } = useAuth();
  return useMutation({
    mutationFn: (file: File) => uploadBillFile(user!.id, file),
  });
}
