import { Tables, Enums } from "./supabase";

export type Subscriptions = Tables<"subscriptions">;

export enum SubscriptionPlan {
  Monthly = "monthly",
  Quarterly = "quarterly",
  SemiAnnual = "semi-annual",
  Annual = "annual",
}

export const planPrices = {
  [SubscriptionPlan.Monthly]: 11.99,
  [SubscriptionPlan.Quarterly]: 24.99,
  [SubscriptionPlan.SemiAnnual]: 39.99,
  [SubscriptionPlan.Annual]: 59.99,
};
