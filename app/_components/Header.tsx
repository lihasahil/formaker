"use client";

import { Button } from "@/components/ui/button";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Header() {
  const { isSignedIn } = useUser();
  const path = usePathname();

  return (
    !path.includes("aiform") && (
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 p-5">
        <nav className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex gap-2 items-center">
            <Image src="/logo/logo.svg" alt="Logo" width={60} height={10} />
            <span className="brutal-text text-black text-2xl">Formaker</span>
          </Link>
          {isSignedIn ? (
            <div className="flex items-center justify-between gap-4">
              <Link href="/dashboard">
                <Button
                  variant="brutalDown"
                  className="rounded-md bg-background"
                >
                  DashBoard
                </Button>
              </Link>

              <UserButton />
            </div>
          ) : (
            <SignInButton>
              <Button variant="brutalDown" className="rounded-md bg-background">
                Get Started
              </Button>
            </SignInButton>
          )}
        </nav>
      </header>
    )
  );
}

export default Header;
