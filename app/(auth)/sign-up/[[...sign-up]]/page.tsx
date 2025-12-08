import { Card } from "@/components/ui/card";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card variant="hover" className="p-0 rounded-xl">
        <SignUp />
      </Card>
    </div>
  );
}
