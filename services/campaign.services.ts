import { prisma } from "@/lib/prisma";

export const createCampaign = async (
  name: string,
  subject: string,
  content: string | null,
  postId: bigint | null,
  segmentId: bigint | null
) => {
  return await prisma.campaign.create({
    data: {
      name,
      subject,
      content,
      post_id: postId,
      segment_id: segmentId,
    },
  });
};

export const getCampaigns = async () => {
  return await prisma.campaign.findMany({
    orderBy: { created_at: "desc" },
    include: {
      _count: {
        select: { events: true },
      },
    },
  });
};

export const getCampaignStats = async (campaignId: number) => {
  const campaign = await prisma.campaign.findUnique({
    where: { id: campaignId },
    include: {
      segment: true,
    },
  });

  if (!campaign) return null;

  const totalSent = await prisma.newsletter.count({
    where: {
      segments: {
        some: {
          id: campaign.segment_id || -1,
        },
      },
    },
  });

  const opens = await prisma.campaignEvent.count({
    where: {
      campaign_id: campaignId,
      type: "open",
    },
  });

  const clicks = await prisma.campaignEvent.count({
    where: {
      campaign_id: campaignId,
      type: "click",
    },
  });

  return {
    campaign,
    totalSent: totalSent || 0, // Approximate, ideally we snapshot this at send time
    opens,
    clicks,
  };
};

export const getNewsletterStats = async () => {
  const totalSubscribers = await prisma.newsletter.count();
  const totalCampaigns = await prisma.campaign.count();

  return {
    totalSubscribers,
    totalCampaigns,
  };
};
