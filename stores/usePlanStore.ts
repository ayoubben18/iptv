import { create } from "zustand";

interface SubscriptionPlan {
  name: string;
  price: string;
  currency: string;
  placeholder: string;
}

interface PlanStore {
  selectedPlan: SubscriptionPlan;
  selectPlan: (plan: SubscriptionPlan) => void;
}

const plans = [
  { name: "monthly", price: "11.99", currency: "USD", placeholder: "Monthly" },
  {
    name: "quarterly",
    price: "24.99",
    currency: "USD",
    placeholder: "Quarterly",
  },
  {
    name: "semi-annual",
    price: "39.99",
    currency: "USD",
    placeholder: "Semi-Annual",
  },
  { name: "annual", price: "59.99", currency: "USD", placeholder: "Annual" },
];

const usePlanStore = create<PlanStore>((set) => ({
  selectedPlan: plans[0],
  selectPlan: (plan) => set({ selectedPlan: plan }),
}));

export { usePlanStore, plans };
