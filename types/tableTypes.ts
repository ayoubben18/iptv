import { Tables } from "./supabase";

export type Subscriptions = Tables<"subscriptions">;
export type Devices = Tables<"devices">;
export type Blogs = Tables<"blogs">;

export enum StatusEnum {
  // 'draft', 'paid', 'completed'
  Draft = "draft",
  Paid = "paid",
  Completed = "completed",
}

export enum ConnectionsEnum {
  One = "1",
  Two = "2",
  Three = "3",
  Four = "4",
  Five = "5",
}

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
