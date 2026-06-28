import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // Create demo user (only if it doesn't already exist)
  const existingUser = await prisma.user.findUnique({
    where: {
      email: "admin@example.com",
    },
  });

  if (!existingUser) {
    await prisma.user.create({
      data: {
        name: "Admin User",
        email: "admin@example.com",
        password: await hash("password123", 10),
      },
    });
  }

  // Seed sample projects only if none exist
  const projectCount = await prisma.project.count();

  if (projectCount === 0) {
    await prisma.project.createMany({
      data: [
        {
          name: "Marketing Website",
          status: "active",
          deadline: new Date("2026-08-01"),
          assignedMember: "Sarah Johnson",
          budget: 12000,
        },
        {
          name: "Mobile App",
          status: "on hold",
          deadline: new Date("2026-09-15"),
          assignedMember: "Michael Brown",
          budget: 30000,
        },
        {
          name: "CRM Integration",
          status: "completed",
          deadline: new Date("2026-05-01"),
          assignedMember: "Emily Davis",
          budget: 8000,
        },
        {
          name: "Customer Portal",
          status: "active",
          deadline: new Date("2026-07-20"),
          assignedMember: "David Wilson",
          budget: 15000,
        },
        {
          name: "Analytics Dashboard",
          status: "active",
          deadline: new Date("2026-10-10"),
          assignedMember: "Jessica Taylor",
          budget: 22000,
        },
      ],
    });
  }

  console.log("Seed completed");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
