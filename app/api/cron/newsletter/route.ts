import { generateUnsubscribeToken } from "@/lib/newsletter-token";
import { createCampaign } from "@/services/campaign.services";
import { sendNewsletterEmail } from "@/services/mail.services";
import { ensureDefaultSegment, getSubscribersBySegment } from "@/services/newsletter.services";
import { getLatestPost } from "@/services/post.services";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const latestPost = await getLatestPost();
  if (!latestPost) {
    return NextResponse.json({ message: "No posts found" });
  }

  // Ensure 'Weekly' segment exists and get it
  const segment = await ensureDefaultSegment();

  // Get subscribers for this segment
  const subscribers = await getSubscribersBySegment(segment.name);
  if (subscribers.length === 0) {
    return NextResponse.json({ message: "No subscribers found in Weekly segment" });
  }

  // Create Campaign
  const campaignName = `Weekly Digest - ${new Date().toISOString().split("T")[0]}`;
  const campaign = await createCampaign(
    campaignName,
    `Latest Post: ${latestPost.title}`,
    null,
    latestPost.id,
    segment.id
  );

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  let sentCount = 0;
  for (const subscriber of subscribers) {
    const unsubscribeToken = generateUnsubscribeToken(subscriber.email);
    const unsubscribeLink = `${baseUrl}/api/newsletter/unsubscribe?token=${unsubscribeToken}`;
    const readMoreLink = `${baseUrl}/articles/${latestPost.slug}`;

    const sent = await sendNewsletterEmail(
      subscriber.email,
      latestPost.title,
      latestPost.description,
      readMoreLink,
      unsubscribeLink,
      campaign.id,
      subscriber.id
    );

    if (sent) {
      sentCount++;
    }
  }

  return NextResponse.json({
    message: "Newsletter sent",
    campaignId: campaign.id.toString(),
    sentCount,
    totalSubscribers: subscribers.length,
  });
}
