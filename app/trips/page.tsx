import { auth } from "@/auth";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function TripsPage() {
  const session = await auth();
  if (!session) {
    return (
      <main className="flex h-screen items-center justify-center text-xl text-gray-700">
        Please log in to view your trips.
      </main>
    );
  }

  return (
    <div className="container mx-auto space-y-6 px-4 py-8">
      <div>
        <h1>Dashboard</h1>
        <Link href={"/trips/new"}>
          <Button>New Trip</Button>
        </Link>
      </div>
    </div>
  );
}
