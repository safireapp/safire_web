import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (sender: string, postId: string|null, commentId: string|null) => {

  if (postId) {
    await prisma.notification.deleteMany({
      where: {
        sender,
        postId,
        type: "LIKE",
      },
    });
  }

  if (commentId) {
    await prisma.notification.deleteMany({
      where: {
        sender,
        commentId,
        type: "LIKE",
      },
    });
  }
};
