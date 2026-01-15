import { prisma } from "./lib/prisma";
async function main() {
  const CATEGORIES = [
    "wellness",
    "holistic-care",
    "self-and-growth",
    "nutrition-and-nature",
  ];
  await prisma.category.createMany({
    data: CATEGORIES.map((category) => {
      return {
        name: category,
      };
    }),
  });
  console.log(`Categories created: ${CATEGORIES}`);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
