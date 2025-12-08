"use client";
import { SignedIn } from "@clerk/clerk-react";
import { ReactNode } from "react";
import SideNav from "./_components/SideNav";

interface LayoutProps {
  children: ReactNode;
}
function layout({ children }: LayoutProps) {
  return (
    <SignedIn>
      <div>
        <div className="md:w-64 fixed">
          <SideNav />
        </div>
        <div className="md:ml-64">{children}</div>
      </div>
    </SignedIn>
  );
}

export default layout;
