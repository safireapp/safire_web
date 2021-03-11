import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (sender: string, postId: string) => {
  await prisma.notification.deleteMany({
    where: {
      sender,
      postId,
      type: "LIKE"
    }
  })
};
