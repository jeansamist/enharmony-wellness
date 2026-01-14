import { prisma } from "./lib/prisma";
async function main() {
  // Check for sensitive environment variables
  if (!process.env.CONFIG_ADMIN_FULL_NAME) {
    throw new Error("Missing CONFIG_ADMIN_FULL_NAME environment variable");
  }
  if (!process.env.CONFIG_ADMIN_EMAIL) {
    throw new Error("Missing CONFIG_ADMIN_EMAIL environment variable");
  }

  const user = await prisma.user.create({
    data: {
      full_name: process.env.CONFIG_ADMIN_FULL_NAME,
      email: process.env.CONFIG_ADMIN_EMAIL,
      password: Math.random().toString(36).slice(-8),
      role: "admin",
    },
  });
  console.log(`Created admin user: ${user.full_name} (${user.email})`);
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
