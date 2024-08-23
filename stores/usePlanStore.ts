import { Offer } from "@/types/plan.types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
interface PlanStore {
  offers: Offer[];
  setOffers: (offers: Offer[]) => void;
}

const usePlanStore = create<PlanStore>()(
  persist(
    (set) => ({
      offers: [],
      setOffers: (offers) => set({ offers }),
    }),
    {
      name: "plan-store",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export { usePlanStore };
