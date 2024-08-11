"use server";

import logger from "@/lib/logger";
import { TypedSupabaseClient } from "@/types/TypedSupabaseClient";
import { Session, User } from "@supabase/supabase-js";

const getUser = async (supabase: TypedSupabaseClient): Promise<User | null> => {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    return null;
  }
  return data.user;
};

const getUserSession = async (
  supabase: TypedSupabaseClient,
): Promise<Session | null> => {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw new Error(error.message);
  return data.session;
};

const logout = async (supabase: TypedSupabaseClient) => {
  const { error } = await supabase.auth.signOut();
  if (error) logger.warn({ error: error.message }, "Error logging out:");
};

export { getUser, getUserSession, logout };
