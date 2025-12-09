import * as React from "react";
import { cn } from "@/lib/utils";

function Input({
  className,
  type = "text",
  ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "bg-background text-black border-4 border-black rounded-md shadow-[4px_4px_0_#000] px-3 py-2 w-full h-10 outline-none transition-all",

        "focus-visible:ring-2 focus-visible:ring-black",

        "disabled:cursor-not-allowed disabled:opacity-50",

        "placeholder:text-muted-foreground selection:bg-black selection:text-yellow-200",

        className
      )}
      {...props}
    />
  );
}

export { Input };
