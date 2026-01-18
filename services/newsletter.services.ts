import { prisma } from "@/lib/prisma";

export const ensureDefaultSegment = async () => {
  const segmentName = "Weekly";
  let segment = await prisma.newsletterSegment.findUnique({
    where: { name: segmentName },
  });
  if (!segment) {
    segment = await prisma.newsletterSegment.create({
      data: { name: segmentName },
    });
  }
  return segment;
};

export const subscribeToNewsletter = async (email: string) => {
  try {
    const segment = await ensureDefaultSegment();

    const existing = await prisma.newsletter.findUnique({
      where: { email },
    });

    if (existing) {
      // Ensure they are in the segment
      await prisma.newsletter.update({
        where: { id: existing.id },
        data: {
          segments: {
            connect: { id: segment.id },
          },
        },
      });
      return existing;
    }

    return await prisma.newsletter.create({
      data: {
        email,
        segments: {
          connect: { id: segment.id },
        },
      },
    });
  } catch (error) {
    console.error("Subscribe error:", error);
    throw new Error("Failed to subscribe");
  }
};

export const unsubscribeFromNewsletter = async (email: string) => {
  try {
    return await prisma.newsletter.delete({
      where: { email },
    });
  } catch (error) {
    console.error("Error unsubscribing:", error);
    return null;
  }
};

export const getAllSubscribers = async () => {
  return await prisma.newsletter.findMany({
    include: { segments: true },
  });
};

export const getSubscribersBySegment = async (segmentName: string) => {
  return await prisma.newsletter.findMany({
    where: {
      segments: {
        some: {
          name: segmentName,
        },
      },
    },
  });
};
