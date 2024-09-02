"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FancySwitch } from "@omit/react-fancy-switch";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const DarkModeSwitch = () => {
  const { theme, setTheme } = useTheme();

  const options = ["dark", "light"];

  return (
    <div>
      <FancySwitch
        options={options}
        value={theme}
        onChange={(value) => setTheme(value as "dark" | "light")}
        className="flex w-max rounded-full bg-muted p-2 lg:hidden"
        highlighterClassName="bg-primary rounded-full"
        radioClassName={cn(
          "relative mx-2 flex h-9 cursor-pointer items-center justify-center rounded-full px-3.5 text-sm font-medium transition-colors focus:outline-none data-[checked]:text-primary-foreground",
        )}
        highlighterIncludeMargin={true}
      />
      <Button
        variant="outline"
        size="icon"
        className="hidden lg:flex"
        onClick={() => {
          theme === "dark" ? setTheme("light") : setTheme("dark");
        }}
      >
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  );
};

export default DarkModeSwitch;
