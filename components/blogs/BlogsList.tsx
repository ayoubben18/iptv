import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { getBlogs } from "@/db/data/blogs-data";
import { getBlogCreationTime } from "@/lib/parsers";
import { getI18n } from "@/locales/server";
import { CalendarIcon, ClockIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const BlogsList = async () => {
  const blogs = await getBlogs();
  if (!blogs) return notFound();
  const t = await getI18n();

  return (
    <div className="grid aspect-video w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {blogs.map(({ id, created_at, content, title }, index) => {
        const {
          title: BlogTitle,
          description,
          image,
        } = getBlogCreationTime(content);
        return (
          <Card className="max-w-sm overflow-hidden" key={id}>
            <div className="relative aspect-video">
              <Link href={`/blogs/${title}`}>
                <Image
                  src={image}
                  alt="The blog image"
                  fill
                  priority
                  className="h-full w-full object-cover"
                />
              </Link>
            </div>
            <CardHeader>
              <h2 className="line-clamp-2 text-xl font-semibold">
                {BlogTitle.length > 30
                  ? BlogTitle.slice(0, 30) + "..."
                  : BlogTitle}
              </h2>
            </CardHeader>
            <CardContent>
              <p className="line-clamp-3 text-muted-foreground">
                {description.length > 100
                  ? description.slice(0, 100) + "..."
                  : description}
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
                <span>
                  {"5"} {t("blogs.minRead")}
                </span>
              </div>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export default BlogsList;
