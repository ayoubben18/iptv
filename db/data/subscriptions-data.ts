"use server";

import { supabase } from "@/clients/supabaseCLient";
import { handleStatus } from "@/lib/handleStatus";
import { Subscriptions } from "@/types/tableTypes";

const insertSubscription = async (
  props: Omit<Subscriptions, "id" | "created_at">,
) => {
  const { data, error, status } = await supabase
    .from("subscriptions")
    .insert(props)
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
