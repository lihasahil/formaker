"use client";

import { Button } from "@/components/ui/button";
import { SignInButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

function CTA() {
  const { isSignedIn } = useUser();

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-md border-2 border-black bg-background px-6 py-12 sm:px-12 sm:py-16 text-center shadow-[6px_6px_0_0_#000]">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-black leading-tight">
            Ready to build your first form?
          </h2>
          <p className="mt-4 text-sm sm:text-base md:text-lg text-gray-600 max-w-xl mx-auto">
            Describe it, let AI build it, and start collecting responses in
            seconds.
          </p>
          <div className="mt-8 flex justify-center">
            {isSignedIn ? (
              <Link href="/dashboard">
                <Button variant="brutalDown" className="rounded-md px-8 py-3">
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <SignInButton>
                <Button variant="brutalDown" className="rounded-md px-8 py-3">
                  Get Started Free
                </Button>
              </SignInButton>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTA;
