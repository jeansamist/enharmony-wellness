import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const campaignId = searchParams.get("c");
  const subscriberId = searchParams.get("s");

  if (campaignId && subscriberId) {
    try {
      await prisma.campaignEvent.create({
        data: {
          campaign_id: BigInt(campaignId),
          subscriber_id: BigInt(subscriberId),
          type: "open",
        },
      });
    } catch (error) {
      console.error("Error tracking open:", error);
    }
  }

  // Return a 1x1 transparent GIF
  const pixel = Buffer.from(
    "R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
    "base64"
  );

  return new NextResponse(pixel, {
    headers: {
      "Content-Type": "image/gif",
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      "Pragma": "no-cache",
      "Expires": "0",
    },
  });
}
