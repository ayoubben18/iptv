import { cn } from "@/lib/utils";
import React from "react";

const PageWrapper = ({
  children,
  className = "",
  notContainer = false,
}: {
  children: React.ReactNode;
  className?: string;
  notContainer?: boolean;
}) => {
  return (
    <div
      className={cn(
        `${notContainer ? "sm:container" : "container"} flex min-h-[calc(100vh-80px)] flex-col items-center`,
        className,
      )}
    >
      {children}
    </div>
  );
};

export default PageWrapper;
