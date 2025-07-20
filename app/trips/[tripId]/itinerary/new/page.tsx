import NewLocationClient from "@/components/new-location";

export default async function NewLocationn({
  params,
}: {
  params: Promise<{ tripId: string }>;
}) {
  const { tripId } = await params;

  return <NewLocationClient tripId={tripId} />;
}
