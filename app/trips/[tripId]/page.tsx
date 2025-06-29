import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

import TripDetailClient from "@/components/trip-detail";

export default async function TripDetail({
  params,
}: {
  params: Promise<{ tripId: string }>;
}) {
  const { tripId } = await params;

  const session = await auth();
  if (!session) {
    return <div>Please log in to view this trip.</div>;
  }

  const trip = await prisma.trip.findFirst({
    where: { id: tripId, userId: session.user?.id },
  });

  if (!trip) {
    return <div>Trip not found or you do not have access to this trip.</div>;
  }

  return <TripDetailClient trip={trip} />;
}
