"use server";

import { auth } from "@/auth";
import { prisma } from "../prisma";
import { redirect } from "next/navigation";

export async function createTrip(formData: FormData) {
  const session = await auth();
  if (!session || !session.user?.id) {
    throw new Error("Unauthorized");
  }

  const title = formData.get("title")?.toString();
  const description = formData.get("description")?.toString();
  const imageUrl = formData.get("imageUrl")?.toString();
  const startDatestr = formData.get("startDate")?.toString();
  const endDatestr = formData.get("endDate")?.toString();

  if (!title || !description || !startDatestr || !endDatestr) {
    throw new Error("All fields are required");
  }

  const startDate = new Date(startDatestr);
  const endDate = new Date(endDatestr);

  await prisma.trip.create({
    data: {
      title,
      description,
      imageUrl,
      startDate,
      endDate,
      userId: session.user.id,
    },
  });

  redirect("/trips");
}
