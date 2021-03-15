import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (recipient: string, sender: string) => {
  return await prisma.notification.create({
    data: {
      recipient,
      sender,
      type: "FOLLOW",
    },
  });
};
