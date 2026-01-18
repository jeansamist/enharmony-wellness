"use server";

import { generateUnsubscribeToken } from "@/lib/newsletter-token";
import { createCampaign } from "@/services/campaign.services";
import { sendNewsletterEmail } from "@/services/mail.services";
import { ensureDefaultSegment, getSubscribersBySegment } from "@/services/newsletter.services";
import { getLatestPost } from "@/services/post.services";
import { getAuthenticatedUser } from "@/services/auth.services";

export async function triggerWeeklyNewsletter() {
  const user = await getAuthenticatedUser();
  if (!user || user.role !== "admin") {
    return { success: false, message: "Unauthorized" };
  }

  const latestPost = await getLatestPost();
  if (!latestPost) {
    return { success: false, message: "No published posts found." };
  }

  const segment = await ensureDefaultSegment();
  const subscribers = await getSubscribersBySegment(segment.name);

  if (subscribers.length === 0) {
    return { success: false, message: "No subscribers found." };
  }

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

  // Ideally this should be a background job, but for now we run it here.
  // If the list is huge, this will timeout.
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

  return { success: true, message: `Newsletter sent to ${sentCount} subscribers.` };
}
