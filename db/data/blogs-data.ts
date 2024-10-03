"use server";

import { supabase } from "@/clients/supabaseCLient";
import { handleStatus } from "@/lib/handleStatus";
import { revalidatePath } from "next/cache";
import { JSONContent } from "novel";
import { Blogs } from "@/types/tableTypes";
interface BlogContent {
  id: string;
  created_at: string;
  content: JSONContent;
  title: string;
}

const getBlogs = async () => {
  let query = supabase.from("blogs").select("*").order("created_at", {
    ascending: true,
  });

  const { data, error, status } = await query;

  return handleStatus(status, data, error) as unknown as BlogContent[];
};

const deleteBlog = async (id: string) => {
  const { data, error, status } = await supabase
    .from("blogs")
    .delete()
    .eq("id", id);

  return handleStatus(status, data, error);
};

const updateBlog = async (id: string, content: string) => {
  const { data, error, status } = await supabase
    .from("blogs")
    .update({ content: JSON.parse(content) })
    .eq("id", id);
  revalidatePath(`/products/content-management/${id}`);
  revalidatePath("/products/content-management");
  return handleStatus(status, data, error);
};

const getBlog = async (title: string) => {
  const { data, error, status } = await supabase
    .from("blogs")
    .select("*")
    .eq("title", title)
    .single();

  return handleStatus(status, data, error) as unknown as BlogContent;
};

export { getBlogs, deleteBlog, updateBlog, getBlog };
