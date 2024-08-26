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
}

const insertBlog = async (content: string) => {
  const { data, error, status } = await supabase
    .from("blogs")
    .insert([
      {
        content: JSON.parse(content),
      },
    ])
    .select("*");
  revalidatePath("/products/content-management");
  return handleStatus(status, data, error) as Blogs;
};

const getBlogs = async (limit: number) => {
  let query = supabase.from("blogs").select("*");
  if (limit) {
    query = query.limit(limit);
  }
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

const getBlog = async (id: string) => {
  const { data, error, status } = await supabase
    .from("blogs")
    .select("*")
    .eq("id", id)
    .single();

  return handleStatus(status, data, error) as unknown as BlogContent;
};

export { insertBlog, getBlogs, deleteBlog, updateBlog, getBlog };
