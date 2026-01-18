import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const campaignId = searchParams.get("c");
  const subscriberId = searchParams.get("s");
  const destination = searchParams.get("d");

  if (!destination) {
    return new NextResponse("Missing destination", { status: 400 });
  }

  if (campaignId && subscriberId) {
    try {
      await prisma.campaignEvent.create({
        data: {
          campaign_id: BigInt(campaignId),
          subscriber_id: BigInt(subscriberId),
          type: "click",
          metadata: destination,
        },
      });
    } catch (error) {
      console.error("Error tracking click:", error);
    }
  }

  return NextResponse.redirect(destination);
}
