"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import { Trip } from "@/app/generated/prisma";
import { Calendar, Plus } from "lucide-react";

import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface TripDetailClientProps {
  trip: Trip;
}

export default function TripDetailClient({ trip }: TripDetailClientProps) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="container mx-auto space-y-0 px-4 py-8">
      {trip.imageUrl && (
        <div className="relative h-72 w-full overflow-hidden rounded-xl shadow-lg md:h-96">
          <Image
            src={trip.imageUrl}
            alt={trip.title}
            className="object-cover"
            fill
            priority
          />
        </div>
      )}

      <div className="flex flex-col items-start justify-between rounded-lg bg-white p-6 shadow md:flex-row md:items-center">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900">
            {trip.title}
          </h1>
          <div className="mt-2 flex items-center text-gray-500">
            <Calendar className="mr-2 size-5" />
            <span className="text-lg">
              {trip.startDate.toLocaleDateString()} -{" "}
              {trip.endDate.toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className="mt-4 md:mt-0">
          <Link href={`/trips/${trip.id}/itinerary/new`}>
            <Button>
              <Plus className="mr-2 size-5" />
              Add Location
            </Button>
          </Link>
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview" className="text-lg">
              Overview
            </TabsTrigger>
            <TabsTrigger value="itinerary" className="text-lg">
              Itinerary
            </TabsTrigger>
            <TabsTrigger value="map" className="text-lg">
              Map
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h2 className="mb-4 text-2xl font-semibold">Trip summary</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Calendar className="mr-3 size-6 text-gray-500" />
                    <div>
                      <p className="font-medium text-gray-700">Dates</p>
                      <p className="text-sm text-gray-500">
                        {trip.startDate.toLocaleDateString()} -{" "}
                        {trip.endDate.toLocaleDateString()}
                        <br />
                        {`${Math.round(
                          (trip.endDate.getTime() - trip.startDate.getTime()) /
                            (1000 * 60 * 60 * 24),
                        )} day(s)`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start"></div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
