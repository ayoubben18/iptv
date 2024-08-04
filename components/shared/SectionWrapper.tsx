import { cn } from "@/lib/utils";
import React from "react";

const SectionWrapper = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("my-10 flex w-full flex-col items-center", className)}>
      {children}
    </div>
  );
};

export default SectionWrapper;
