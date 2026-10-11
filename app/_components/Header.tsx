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
      <>
      {/* spacer so page content starts below the fixed header */}
      <div aria-hidden className="h-[var(--header-h)]" />
      <header className="fixed top-0 left-0 right-0 z-50 h-[var(--header-h)] bg-white border-b border-gray-200 px-4 md:px-5 flex items-center">
        <nav className="w-full max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex gap-2 items-center">
            <Image
              src="/logo/logo.svg"
              alt="Logo"
              width={60}
              height={10}
              className="w-10 md:w-[60px] h-auto"
            />
            <span className="brutal-text text-black text-xl md:text-2xl">
              Formaker
            </span>
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
      </>
    )
  );
}

export default Header;
