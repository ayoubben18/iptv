import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto my-0 flex w-full max-w-screen-lg flex-col items-start gap-8 space-y-4 sm:my-20">
      {/* Article title */}
      <Skeleton className="h-12 w-3/4" />

      {/* Article content */}
      <div className="w-full space-y-4">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-11/12" />
        <Skeleton className="h-6 w-10/12" />
      </div>
    </div>
  );
}
