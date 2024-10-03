"use client";

import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { EditorContent, EditorRoot, JSONContent } from "novel";
import { defaultExtensions } from "./extensions";

interface BlogWrapperProps {
  content: JSONContent;
  type?: "blogs" | "articles";
}

const BlogWrapper = ({ content, type }: BlogWrapperProps) => {
  const extensions = [...defaultExtensions];
  const { push } = useRouter();

  return (
    <div className="relative flex w-full max-w-screen-lg flex-col items-center">
      {content && (
        <EditorRoot>
          <EditorContent
            immediatelyRender={false}
            initialContent={content}
            className="relative min-h-[500px] w-full max-w-screen-lg bg-background sm:mb-3 sm:rounded-lg"
            extensions={extensions}
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
          push(`/${type}`);
        }}
      >
        <HomeIcon className="mr-2 h-4 w-4" />
        Return to Blogs
      </Button>
    </div>
  );
};

export default BlogWrapper;
