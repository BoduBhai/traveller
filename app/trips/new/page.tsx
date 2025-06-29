"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { createTrip } from "@/lib/actions/create-trip";
import { UploadButton } from "@/lib/upload-thing";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState, useTransition } from "react";

export default function NewTrip() {
  const [isPending, startTransition] = useTransition();
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  return (
    <div className="mx-auto mt-10 max-w-lg">
      <Card>
        <CardHeader>New Trip</CardHeader>
        <CardContent>
          <form
            className="space-y-6"
            action={(formdata: FormData) => {
              if (imageUrl) {
                formdata.append("imageUrl", imageUrl);
              }

              startTransition(() => {
                createTrip(formdata);
              });
            }}
          >
            <div>
              <label
                htmlFor="title"
                className="mb-1 block to-gray-700 text-sm font-medium"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Japan trip..."
                className={cn(
                  "w-full border border-gray-300 px-3 py-2",
                  "rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none",
                )}
                required
              />
            </div>
            <div>
              <label
                htmlFor="title"
                className="mb-1 block to-gray-700 text-sm font-medium"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="Trip description..."
                className={cn(
                  "w-full border border-gray-300 px-3 py-2",
                  "rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none",
                )}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="startDate"
                  className="mb-1 block to-gray-700 text-sm font-medium"
                >
                  Start Date
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  className={cn(
                    "w-full border border-gray-300 px-3 py-2",
                    "rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none",
                  )}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="endDate"
                  className="mb-1 block to-gray-700 text-sm font-medium"
                >
                  End Date
                </label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  className={cn(
                    "w-full border border-gray-300 px-3 py-2",
                    "rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none",
                  )}
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="">Trip Image</label>
              {imageUrl && (
                <Image
                  src={imageUrl}
                  alt="Trip Preview"
                  width={300}
                  height={100}
                  className="mb-4 max-h-48 w-full rounded-md object-cover"
                />
              )}
              <UploadButton
                endpoint={"imageUploader"}
                onClientUploadComplete={(res) => {
                  if (res && res[0].ufsUrl) {
                    setImageUrl(res[0].ufsUrl);
                  }
                }}
                onUploadError={(error: Error) => {
                  console.error("Upload failed:", error);
                }}
              />
            </div>

            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? "Creating..." : "Create Trip"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
