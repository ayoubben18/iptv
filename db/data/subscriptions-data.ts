"use server";

import { supabase } from "@/clients/supabaseCLient";
import { handleStatus } from "@/lib/handleStatus";
import { Subscriptions } from "@/types/tableTypes";

const insertSubscription = async (props: Partial<Subscriptions>) => {
  const { data, error, status } = await supabase
    .from("subscriptions")
    .insert({
      ...props,
      plan: props.plan || "monthly", // Provide a default value for 'plan'
      price: props.price || 0, // Provide a default value for 'price'
      user_id: props.user_id!, // Provide a default value for 'user_id'
    })
    .select("*")
    .single();
  return handleStatus(status, data, error) as Subscriptions;
};

const getSubscriptions = async (userId: string) => {
  const { data, error, status } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", userId);

  return handleStatus(status, data, error) as Subscriptions[];
};

export { insertSubscription, getSubscriptions };
