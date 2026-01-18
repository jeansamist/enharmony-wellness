import { prisma } from "./lib/prisma";

const CATEGORIES = [
  "wellness",
  "holistic-care",
  "self-and-growth",
  "nutrition-and-nature",
];

const SAMPLE_IMAGES = [
  "https://images.unsplash.com/photo-1544367563-12123d8965cd?q=80&w=2070&auto=format&fit=crop", // Yoga/Wellness
  "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop", // Healthy Food
  "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=2070&auto=format&fit=crop", // Morning Coffee/Journaling
  "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2031&auto=format&fit=crop", // Meditation/Nature
  "https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=2070&auto=format&fit=crop", // Yoga Pose
];

const MARKDOWN_CONTENT = `
## Introduction

Embracing a holistic approach to health means looking at the big picture of your life. It's not just about what you eat or how much you exercise; it's about how you think, feel, and interact with the world around you.

### The Pillars of Wellness

1.  **Physical Health**: Nourishing your body with whole foods and movement.
2.  **Mental Clarity**: Practicing mindfulness and continuous learning.
3.  **Emotional Balance**: Understanding and expressing your feelings healthily.
4.  **Spiritual Connection**: Finding purpose and meaning in your daily actions.

> "Health is a state of body. Wellness is a state of being." - J. Stanford

## Practical Steps for Daily Healing

Start your day with intention. A simple glass of warm lemon water can kickstart your digestion. Follow this with ten minutes of meditation or journaling.

![Relaxing Morning](https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=2070&auto=format&fit=crop)

### Nutrition and Nature

Eating clearly is thinking clearly. Incorporate more leafy greens, berries, and nuts into your diet. Spend time outdoors; the Japanese practice of *Shinrin-yoku* (forest bathing) has been proven to lower cortisol levels.

## Conclusion

Small changes lead to big transformations. Listen to your body, respect your limits, and celebrate your progress.
`;

const LONG_MARKDOWN_CONTENT_2 = `
## The Power of Mindfulness

In our fast-paced world, slowing down can seem counterintuitive. However, mindfulness is the key to unlocking higher productivity and better mental health.

### What is Mindfulness?

Mindfulness is the basic human ability to be fully present, aware of where we are and what we’re doing, and not overly reactive or overwhelmed by what’s going on around us.

*   **Focus**: Pay attention to your breath.
*   **Observation**: Notice thoughts without judgment.
*   **Return**: Gently bring your attention back when it wanders.

## Creating a Sanctuary at Home

Your environment reflects your inner state. Declutter your space to declutter your mind. Use plants, soft lighting, and natural materials to create a calming atmosphere.

> "Peace comes from within. Do not seek it without." - Buddha

## Final Thoughts

Take a moment today to just *be*.
`;

async function main() {
  console.log("🌱 Starting setup...");

  // 1. Create Users
  console.log("👤 Setting up users...");

  // Writer User
  const writer = await prisma.user.upsert({
    where: { email: "writer@enharmony.com" },
    update: {},
    create: {
      full_name: "Sarah Harmony",
      email: "writer@enharmony.com",
      password: "password123", // In a real app, hash this!
      role: "writer",
    },
  });

  // Reviewer User
  const reviewer = await prisma.user.upsert({
    where: { email: "reviewer@enharmony.com" },
    update: {},
    create: {
      full_name: "Dr. Zen Reviewer",
      email: "reviewer@enharmony.com",
      password: "password123",
      role: "reviewer",
    },
  });

  console.log(
    `✅ Users ready: Writer (${writer.id}), Reviewer (${reviewer.id})`
  );

  // 2. Create Categories
  console.log("DH Setting up categories...");
  const categoryMap = new Map();

  for (const name of CATEGORIES) {
    // Check if exists first to get ID, or create
    const existing = await prisma.category.findFirst({ where: { name } });
    let category;
    if (existing) {
      category = existing;
    } else {
      category = await prisma.category.create({ data: { name } });
    }
    categoryMap.set(name, category);
  }
  console.log("✅ Categories ready.");

  // 3. Create Posts
  console.log("📝 Creating posts...");

  const postsData = [
    {
      title: "The Art of Daily Healing",
      slug: "the-art-of-daily-healing",
      category: "wellness",
      cover: SAMPLE_IMAGES[0],
      content: MARKDOWN_CONTENT,
    },
    {
      title: "Holistic Approaches to Anxiety",
      slug: "holistic-approaches-to-anxiety",
      category: "holistic-care",
      cover: SAMPLE_IMAGES[1],
      content: LONG_MARKDOWN_CONTENT_2,
    },
    {
      title: "Growth Through Adversity",
      slug: "growth-through-adversity",
      category: "self-and-growth",
      cover: SAMPLE_IMAGES[2],
      content: MARKDOWN_CONTENT,
    },
    {
      title: "Eating with the Seasons",
      slug: "eating-with-the-seasons",
      category: "nutrition-and-nature",
      cover: SAMPLE_IMAGES[3],
      content: LONG_MARKDOWN_CONTENT_2,
    },
    {
      title: "Morning Rituals for Success",
      slug: "morning-rituals-for-success",
      category: "self-and-growth",
      cover: SAMPLE_IMAGES[4],
      content: MARKDOWN_CONTENT,
    },
  ];

  for (const p of postsData) {
    const category = categoryMap.get(p.category);
    if (!category) continue;

    // Check if post exists
    const existingPost = await prisma.post.findFirst({
      where: { slug: p.slug },
    });

    let postId;

    if (!existingPost) {
      const post = await prisma.post.create({
        data: {
          title: p.title,
          slug: p.slug,
          description: p.title + " - A deep dive into better living.",
          content: p.content,
          cover: p.cover,
          read_time: 5,
          views: Math.floor(Math.random() * 100),
          published: true,
          approved: true,
          type: "text",
          user_id: writer.id,
          category_id: category.id,
        },
      });
      postId = post.id;
      console.log(`   + Created post: ${p.title}`);
    } else {
      postId = existingPost.id;
      console.log(`   . Post exists: ${p.title}`);
    }

    // 4. Create Review
    // Randomly decide to add a review if it doesn't exist
    const existingReview = await prisma.review.findFirst({
      where: { post_id: postId, user_id: reviewer.id },
    });

    if (!existingReview) {
      await prisma.review.create({
        data: {
          post_id: postId,
          user_id: reviewer.id,
        },
      });
      console.log(`     + Added review by ${reviewer.full_name}`);
    }
  }

  console.log("✨ Setup completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
