"use client";

import { getFormCount } from "@/app/actions/get-form-count";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FORM_LIMIT } from "@/lib/constants";
import { useUser } from "@clerk/nextjs";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface FormUsage {
  /** null until the first fetch finishes */
  count: number | null;
  limit: number;
  limitReached: boolean;
  refresh: () => Promise<void>;
  openUpgrade: (reason?: "limit") => void;
}

const FormUsageContext = createContext<FormUsage | null>(null);

export function useFormUsage() {
  const ctx = useContext(FormUsageContext);
  if (!ctx) throw new Error("useFormUsage must be used inside FormUsageProvider");
  return ctx;
}

export function FormUsageProvider({ children }: { children: ReactNode }) {
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress;
  const [count, setCount] = useState<number | null>(null);
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const [reason, setReason] = useState<"limit" | undefined>();

  const refresh = useCallback(async () => {
    if (!email) return;
    const res = await getFormCount(email);
    if (res.success) setCount(res.count);
  }, [email]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const openUpgrade = (r?: "limit") => {
    setReason(r);
    setUpgradeOpen(true);
  };

  return (
    <FormUsageContext.Provider
      value={{
        count,
        limit: FORM_LIMIT,
        limitReached: count !== null && count >= FORM_LIMIT,
        refresh,
        openUpgrade,
      }}
    >
      {children}
      <Dialog open={upgradeOpen} onOpenChange={setUpgradeOpen}>
        <DialogContent className="bg-background">
          <DialogHeader>
            <DialogTitle>Upgrade — coming soon</DialogTitle>
            <DialogDescription>
              {reason === "limit"
                ? `You've used all ${FORM_LIMIT} forms on the free plan. `
                : ""}
              Paid plans with unlimited forms are coming soon. Stay tuned!
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end">
            <Button
              variant="brutalDown"
              className="rounded-md"
              onClick={() => setUpgradeOpen(false)}
            >
              Got it
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </FormUsageContext.Provider>
  );
}
