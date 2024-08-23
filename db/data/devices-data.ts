"use server";

import { supabase } from "@/clients/supabaseCLient";
import { handleStatus } from "@/lib/handleStatus";
import { Devices } from "@/types/tableTypes";

const insertDevices = async (devices: Omit<Devices, "id">[]) => {
  const { data, error, status } = await supabase
    .from("devices")
    .insert(devices)
    .select("*");

  return handleStatus(status, data, error) as Devices[];
};

export { insertDevices };
