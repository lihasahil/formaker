"use client";

import { Button } from "@/components/ui/button";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

function Header() {
  const { user, isSignedIn } = useUser();
  return (
    <div className="p-5">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <Image src="/logo/logo.svg" alt="Logo" width={60} height={10} />
          <span className="brutal-text text-black text-2xl">Formaker</span>
        </div>
        {isSignedIn ? (
          <div className="flex items-center justify-between gap-4">
            <Link href="/dashboard">
              <Button variant="brutalDown" className="rounded-md bg-background">
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
      </div>
    </div>
  );
}

export default Header;
