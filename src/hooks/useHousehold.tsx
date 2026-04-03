import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useAuth } from "./useAuth";
import { getOrCreateHousehold, seedUserData } from "@/services/energyService";

interface HouseholdContextType {
  householdId: string | null;
  loading: boolean;
  refresh: () => Promise<void>;
}

const HouseholdContext = createContext<HouseholdContextType | undefined>(undefined);

export function HouseholdProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [householdId, setHouseholdId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    if (!user) {
      setHouseholdId(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      let household = await getOrCreateHousehold(user.id);
      if (!household) {
        const res = await seedUserData();
        if (res.household_id) {
          household = await getOrCreateHousehold(user.id);
        }
      }
      setHouseholdId(household?.id ?? null);
    } catch (e) {
      console.error("Failed to load household:", e);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, [user]);

  return (
    <HouseholdContext.Provider value={{ householdId, loading, refresh: load }}>
      {children}
    </HouseholdContext.Provider>
  );
}

export function useHousehold() {
  const ctx = useContext(HouseholdContext);
  if (!ctx) throw new Error("useHousehold must be used within HouseholdProvider");
  return ctx;
}
