import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (sender: string, recipient: string) => {
  return await prisma.notification.create({
    data: {
      recipient,
      sender,
      type: "NEW_DM",
    },
  });
};
