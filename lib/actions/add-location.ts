"use server";

import { auth } from "@/auth";

async function geocodeAddress(address: string) {}

export default async function addLocation(formData: FormData, tripId: string) {
  const session = await auth();
  if (!session) {
    throw new Error("You must be logged in to add a location.");
  }

  const address = formData.get("address")?.toString();
  if (!address) {
    throw new Error("Address is required.");
  }
}
