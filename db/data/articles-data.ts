"use server";

import { supabase } from "@/clients/supabaseCLient";

const getArticles = async () => {
  const { data, error, status } = await supabase
    .from("articles")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const getArticle = async (title: string) => {
  const { data, error, status } = await supabase
    .from("articles")
    .select("*")
    .eq("title", title)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export { getArticles, getArticle };
