"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

interface BrutalProgressProps
  extends React.ComponentProps<typeof ProgressPrimitive.Root> {
  value?: number; // 0 - 100
}

function Progress({ className, value = 0, ...props }: BrutalProgressProps) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "bg-yellow-200 border-4 border-black rounded-none relative h-6 w-full overflow-hidden",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn("bg-black h-full transition-all shadow-[4px_4px_0_#000]")}
        style={{ transform: `translateX(-${100 - value}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
