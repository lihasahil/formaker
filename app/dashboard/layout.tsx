"use client";

import { SignedIn } from "@clerk/clerk-react";
import { ReactNode } from "react";
import SideNav, { MobileNav } from "./_components/SideNav";

interface LayoutProps {
  children: ReactNode;
}
function layout({ children }: LayoutProps) {
  return (
    <SignedIn>
      <div>
        <div className="hidden md:block md:w-64 fixed top-[var(--header-h)] bottom-0 left-0">
          <SideNav />
        </div>
        <MobileNav />
        <div className="md:ml-64">{children}</div>
      </div>
    </SignedIn>
  );
}

export default layout;
