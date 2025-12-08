import * as React from "react";
import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "bg-yellow-200 text-black border-4 border-black rounded-md shadow-[3px_3px_0_#000] px-3 py-2 w-full min-h-16 outline-none transition-all",

        "focus-visible:ring-2 focus-visible:ring-black",

        "disabled:cursor-not-allowed disabled:opacity-50",

        "md:text-sm",

        className
      )}
      {...props}
    />
  );
}

export { Textarea };
