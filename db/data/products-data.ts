"use server";

import { supabase } from "@/clients/supabaseCLient";
import { handleStatus } from "@/lib/handleStatus";
import { Tables } from "@/types/supabase";

type Products = Tables<"products">;

const getProducts = async (): Promise<Products[] | null> => {
  const { data, error, status } = await supabase.from("products").select("*");

  return handleStatus(status, data, error) as Products[] | null;
};

export { getProducts };
