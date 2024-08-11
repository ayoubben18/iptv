"use server";

import { createClient } from "@/utils/supabase/server";
import { logout } from "../data/users-data";
import { revalidatePath } from "next/cache";

const logoutService = async () => {
  const supabase = createClient();

  await logout(supabase);
  revalidatePath("/profile");
};

export { logoutService };
