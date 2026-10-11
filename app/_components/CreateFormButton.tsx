"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SignInButton, SignUpButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

function CreateFormButton() {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    if (isSignedIn) {
      router.push("/dashboard?create=true");
    } else {
      setOpen(true);
    }
  };

  return (
    <>
      <Button
        variant="brutalDown"
        onClick={handleClick}
        disabled={!isLoaded}
        className="rounded-md px-6 sm:px-8 py-2.5 sm:py-3 font-medium bg-background transition-colors text-sm sm:text-base"
      >
        Create Form
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-background">
          <DialogHeader>
            <DialogTitle>Sign up or log in to continue</DialogTitle>
            <DialogDescription>
              You need an account to create and manage your forms.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
            <SignInButton
              mode="modal"
              forceRedirectUrl="/dashboard?create=true"
              signUpForceRedirectUrl="/dashboard?create=true"
            >
              <Button variant="brutalDown" className="rounded-md bg-background">
                Log in
              </Button>
            </SignInButton>
            <SignUpButton
              mode="modal"
              forceRedirectUrl="/dashboard?create=true"
              signInForceRedirectUrl="/dashboard?create=true"
            >
              <Button variant="brutalDown" className="rounded-md">
                Sign up
              </Button>
            </SignUpButton>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CreateFormButton;
