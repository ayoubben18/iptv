import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { getBlogs } from "@/db/data/blogs-data";
import { CalendarIcon, ClockIcon, Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const BlogsList = async () => {
  const blogs = await getBlogs(10);

  return (
    <div className="grid aspect-video w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {blogs.map(({ id, created_at, content }, index) => {
        const firstTitle =
          content?.content?.find((item) => item.type === "heading")
            ?.content?.[0]?.text ?? "No Title";
        const firstParagraph =
          content?.content?.find((item) => item.type === "paragraph")
            ?.content?.[0]?.text ?? "No Description";
        const firstImage =
          content?.content?.find((item) => item.type === "image")?.attrs?.src ??
          "/no-image.jpg";
        return (
          <Card className="max-w-sm overflow-hidden" key={id}>
            <div className="relative aspect-video">
              <Link href={`/blogs/${id}`}>
                <Image
                  src={firstImage}
                  alt=""
                  fill
                  className="h-full w-full object-cover"
                />
              </Link>
            </div>
            <CardHeader>
              <h2 className="line-clamp-2 text-xl font-semibold">
                {firstTitle.length > 30
                  ? firstTitle.slice(0, 30) + "..."
                  : firstTitle}
              </h2>
            </CardHeader>
            <CardContent>
              <p className="line-clamp-3 text-muted-foreground">
                {firstParagraph.length > 100
                  ? firstParagraph.slice(0, 100) + "..."
                  : firstParagraph}
              </p>
            </CardContent>
            <CardFooter className="flex justify-between text-sm text-muted-foreground">
              <div className="flex items-center">
                <CalendarIcon className="mr-1 h-4 w-4" />
                <time dateTime={created_at}>
                  {new Date(created_at).toLocaleDateString()}
                </time>
              </div>
              <div className="flex items-center">
                <ClockIcon className="mr-1 h-4 w-4" />
                <span>{"5"} min read</span>
              </div>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export default BlogsList;
