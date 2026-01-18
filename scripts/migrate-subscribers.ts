import { prisma } from "../lib/prisma";
import { ensureDefaultSegment } from "../services/newsletter.services";

async function main() {
  console.log("Starting migration of existing subscribers to 'Weekly' segment...");
  
  const segment = await ensureDefaultSegment();
  console.log(`Default segment '${segment.name}' verified (ID: ${segment.id})`);

  const subscribers = await prisma.newsletter.findMany({
    include: { segments: true },
  });

  let count = 0;
  for (const sub of subscribers) {
    const hasWeekly = sub.segments.some((s) => s.id === segment.id);
    if (!hasWeekly) {
      await prisma.newsletter.update({
        where: { id: sub.id },
        data: {
          segments: {
            connect: { id: segment.id },
          },
        },
      });
      count++;
    }
  }

  console.log(`Updated ${count} subscribers to include 'Weekly' segment.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
