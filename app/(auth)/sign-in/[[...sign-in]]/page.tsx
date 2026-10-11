import { Card } from "@/components/ui/card";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-var(--header-h))] py-6 md:py-10 px-2">
      <Card variant="hover" className="p-0 rounded-xl">
        <SignIn />
      </Card>
    </div>
  );
}
