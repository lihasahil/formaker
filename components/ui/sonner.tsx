"use client";

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      position="top-right"
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-5 font-bold" />,
        info: <InfoIcon className="size-5 font-bold" />,
        warning: <TriangleAlertIcon className="size-5 font-bold" />,
        error: <OctagonXIcon className="size-5 font-bold" />,
        loading: <Loader2Icon className="size-5 animate-spin font-bold" />,
      }}
      style={
        {
          "--normal-bg": "#f5f5f5",
          "--normal-text": "#000000",
          "--normal-border": "#000000",
          "--border-radius": "0.375rem",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast:
            "group toast border-2 border-black bg-white text-black font-bold text-sm",
          title: "font-black text-base tracking-tight",
          description: "font-semibold text-xs mt-1 opacity-90",
          closeButton:
            "border-l-2 border-black h-full hover:bg-black hover:text-white transition-colors",
        },
        style: {
          boxShadow: "4px 4px 0px rgba(0,0,0,1)",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
