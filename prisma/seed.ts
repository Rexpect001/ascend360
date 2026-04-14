import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter } as ConstructorParameters<typeof PrismaClient>[0]);

async function main() {
  console.log("🌱 Seeding ASCEND360 database...");

  // ── Categories ──────────────────────────────────────────────────────────────
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: "education" },
      update: {},
      create: { name: "Education", slug: "education", description: "Education news and insights" },
    }),
    prisma.category.upsert({
      where: { slug: "impact" },
      update: {},
      create: { name: "Impact", slug: "impact", description: "Stories of impact and transformation" },
    }),
    prisma.category.upsert({
      where: { slug: "news" },
      update: {},
      create: { name: "News", slug: "news", description: "ASCEND360 news and announcements" },
    }),
    prisma.category.upsert({
      where: { slug: "student-stories" },
      update: {},
      create: { name: "Student Stories", slug: "student-stories", description: "Success stories from our students" },
    }),
    prisma.category.upsert({
      where: { slug: "global-opportunities" },
      update: {},
      create: { name: "Global Opportunities", slug: "global-opportunities", description: "Scholarships, fellowships, and global programs" },
    }),
  ]);
  console.log(`✅ Created ${categories.length} categories`);

  // ── Projects ────────────────────────────────────────────────────────────────
  const projects = await Promise.all([
    prisma.project.upsert({
      where: { slug: "xcel360" },
      update: {},
      create: {
        name: "Xcel360",
        slug: "xcel360",
        description:
          "Equipping students with information about global opportunities through virtual learning sessions on AI, scholarships, and career development.",
        longDescription: `Xcel360 is ASCEND360's flagship education initiative, delivered via Twitter/X Spaces to reach students anywhere in Nigeria with just a smartphone.

Each session is 2-3 hours long and covers:
- Global scholarship opportunities and how to apply
- AI tools and digital skills for the modern economy
- Career development strategies and professional networking
- Direct Q&A with mentors and industry professionals

Since launch, Xcel360 has reached over 500 students and facilitated 10+ scholarship wins, including prestigious Mastercard Foundation Scholarships.

The program also features an Annual Presentation Day where students showcase projects and connect directly with partners and mentors.`,
        status: "ACTIVE",
        sdgAlignment: "SDG 4",
        displayOrder: 1,
      },
    }),
    prisma.project.upsert({
      where: { slug: "poverty-reduction" },
      update: {},
      create: {
        name: "Poverty Reduction Initiative",
        slug: "poverty-reduction",
        description:
          "Breaking poverty cycles through intentional skill-building, mentorship, and economic empowerment for underserved Nigerian communities.",
        longDescription:
          "Our poverty reduction initiative addresses the root causes of poverty through skills training, financial literacy, and sustainable employment pathways. Launching soon.",
        status: "COMING_SOON",
        sdgAlignment: "SDG 1",
        displayOrder: 2,
      },
    }),
    prisma.project.upsert({
      where: { slug: "climate-action" },
      update: {},
      create: {
        name: "Climate & Environmental Action",
        slug: "climate-action",
        description:
          "Building climate literacy and environmental stewardship in Nigerian communities — from schools to local governance.",
        longDescription:
          "This initiative will focus on climate education, tree planting campaigns, waste reduction programs, and advocacy for environmental policy in Nigerian communities. Launching soon.",
        status: "COMING_SOON",
        sdgAlignment: "SDG 13",
        displayOrder: 3,
      },
    }),
  ]);
  console.log(`✅ Created ${projects.length} projects`);

  // ── Team Members ────────────────────────────────────────────────────────────
  const teamMembers = await Promise.all([
    prisma.teamMember.upsert({
      where: { id: "founder-johnson" },
      update: {},
      create: {
        id: "founder-johnson",
        name: "Johnson Alabi",
        title: "President & Co-Founder",
        roleType: "TRUSTEE",
        bio: "Johnson is the visionary force behind ASCEND360. A passionate advocate for educational equity, he founded the organization after witnessing first-hand how access to information transforms lives. Under his leadership, Xcel360 has reached over 500 students across Nigeria.",
        displayOrder: 1,
        isActive: true,
      },
    }),
    prisma.teamMember.upsert({
      where: { id: "founder-seun" },
      update: {},
      create: {
        id: "founder-seun",
        name: "Seun",
        title: "Co-Founder & Director of Programs",
        roleType: "TRUSTEE",
        bio: "Seun leads program design and implementation at ASCEND360. With deep expertise in community development, Seun ensures every initiative is grounded in the real needs of students and communities across Nigeria.",
        displayOrder: 2,
        isActive: true,
      },
    }),
    prisma.teamMember.upsert({
      where: { id: "founder-akindoyin" },
      update: {},
      create: {
        id: "founder-akindoyin",
        name: "Akindoyin",
        title: "Co-Founder & Director of Partnerships",
        roleType: "TRUSTEE",
        bio: "Akindoyin builds and manages ASCEND360's strategic partnerships with corporations, international organizations, and academic institutions. Their network has been pivotal in creating scholarship pathways for Xcel360 students.",
        displayOrder: 3,
        isActive: true,
      },
    }),
  ]);
  console.log(`✅ Created ${teamMembers.length} team members`);

  // ── Admin User ──────────────────────────────────────────────────────────────
  const adminPassword = await bcrypt.hash("Ascend360@Admin!", 12);
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@ascend360.org" },
    update: {},
    create: {
      email: "admin@ascend360.org",
      name: "Admin User",
      passwordHash: adminPassword,
      role: "ADMIN",
      isActive: true,
    },
  });
  console.log(`✅ Created admin user: ${adminUser.email}`);

  // ── Sample Blog Post ─────────────────────────────────────────────────────────
  const educationCategory = categories[0];
  const samplePost = await prisma.blogPost.upsert({
    where: { slug: "xcel360-launch-500-students" },
    update: {},
    create: {
      title: "Xcel360 Reaches 500 Students: A Milestone in Educational Access",
      slug: "xcel360-launch-500-students",
      content: `We are thrilled to announce that ASCEND360's flagship program, Xcel360, has now reached over 500 students across Nigeria through our virtual learning sessions on Twitter/X Spaces.

## What This Milestone Means

When we launched Xcel360, our goal was simple: make life-changing information accessible to every Nigerian student, regardless of where they live or what school they attend. Reaching 500 students is proof that this model works.

## Student Outcomes

The impact has been remarkable:
- 10+ students have won international scholarships, including Mastercard Foundation awards
- Dozens of students have accessed AI and digital skills training
- Hundreds have connected with mentors in their fields of interest

## What's Next

We're expanding Xcel360 sessions to cover more topics and reach more students. Our Annual Presentation Day is coming up — watch this space for registration details.

Thank you to every student, mentor, and partner who has made this journey possible.`,
      excerpt:
        "ASCEND360's Xcel360 program has reached over 500 Nigerian students through virtual learning sessions — here's what that milestone means and what comes next.",
      status: "PUBLISHED",
      publishedAt: new Date("2024-01-15"),
      authorId: adminUser.id,
      categoryId: educationCategory.id,
    },
  });
  console.log(`✅ Created sample blog post: ${samplePost.title}`);

  // ── Sample Impact Story ──────────────────────────────────────────────────────
  const impactStory = await prisma.impactStory.upsert({
    where: { id: "impact-story-1" },
    update: {},
    create: {
      id: "impact-story-1",
      studentName: "Fatima A.",
      storyTitle: "From Xcel360 to Mastercard Scholar",
      storyContent: `Before joining Xcel360, I had no idea that scholarships like the Mastercard Foundation existed. I was a bright student but lacked the guidance to navigate international opportunities.

After attending my first Xcel360 session, everything changed. I learned about the scholarship application process, connected with a mentor who had gone through it, and spent the next three months preparing my application.

Today, I am a Mastercard Foundation Scholar studying Computer Science at the African Leadership University. My journey started with a two-hour virtual session on Twitter Spaces.

If you are a student reading this: attend the next session. Your future may depend on what you learn there.`,
      outcome: "Won Mastercard Foundation Scholarship",
      isPublished: true,
      publishedAt: new Date("2024-02-01"),
    },
  });
  console.log(`✅ Created sample impact story: ${impactStory.storyTitle}`);

  // ── Site Config ──────────────────────────────────────────────────────────────
  await Promise.all([
    prisma.siteConfig.upsert({
      where: { key: "site_name" },
      update: {},
      create: { key: "site_name", value: "ASCEND360" },
    }),
    prisma.siteConfig.upsert({
      where: { key: "contact_email" },
      update: {},
      create: { key: "contact_email", value: "info@ascend360.org" },
    }),
    prisma.siteConfig.upsert({
      where: { key: "twitter_url" },
      update: {},
      create: { key: "twitter_url", value: "https://twitter.com/ascend360ng" },
    }),
  ]);
  console.log("✅ Created site config entries");

  console.log("\n🎉 Database seeded successfully!");
  console.log("─".repeat(50));
  console.log("Admin credentials:");
  console.log("  Email:    admin@ascend360.org");
  console.log("  Password: Ascend360@Admin!");
  console.log("─".repeat(50));
  console.log("⚠️  Change the admin password immediately after first login!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
