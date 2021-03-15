import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (recipient: string, sender: string) => {
  await prisma.notification.deleteMany({
    where: {
      sender,
      recipient,
      type: "FOLLOW"
    }
  })
};
