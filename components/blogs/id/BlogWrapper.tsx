"use client";

import { EditorContent, EditorRoot, JSONContent } from "novel";
import { ImageResizer } from "novel/extensions";
import React from "react";
import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { deleteBlog } from "@/db/data/blogs-data";
import { toast } from "sonner";
import { defaultExtensions } from "./extensions";

interface BlogWrapperProps {
  id: string;
  content: JSONContent;
}

const BlogWrapper = ({ id, content }: BlogWrapperProps) => {
  const extensions = [...defaultExtensions];
  const { push } = useRouter();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: deleteBlog,
  });

  const handleDelete = async () => {
    toast.promise(mutateAsync(id), {
      loading: "Deleting...",
      success: "Deleted",
      error: "Error",
    });
  };

  return (
    <div className="relative flex w-full max-w-screen-lg flex-col items-center">
      {content && (
        <EditorRoot>
          <EditorContent
            immediatelyRender={false}
            initialContent={content}
            className="relative min-h-[500px] w-full max-w-screen-lg bg-background sm:mb-3 sm:rounded-lg"
            extensions={extensions}
            slotAfter={<ImageResizer />}
            editorProps={{
              attributes: {
                class: `prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full`,
              },
            }}
            editable={false}
          />
        </EditorRoot>
      )}
      <Button
        variant="outline"
        className="mt-4"
        onClick={() => {
          push("/blogs");
        }}
      >
        <HomeIcon className="mr-2 h-4 w-4" />
        Return to Blogs
      </Button>
    </div>
  );
};

export default BlogWrapper;
