import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="max-w-7xl">
      <h1 className="brutal-text brutal-text-shadow brutal-outline text-yellow-200 text-4xl">Brutal</h1>

      <Card variant="shadow" className="rounded-md bg-pink-400">
        <CardHeader className="brutal-text">Hello</CardHeader>
        <CardFooter>
          <Button variant="brutal">Click Me</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
