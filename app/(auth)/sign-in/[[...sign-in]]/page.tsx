import { Card } from "@/components/ui/card";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex items-center justify-center">
      <Card variant="hover" className="p-0 rounded-xl">
        <SignIn />
      </Card>
    </div>
  );
}
