import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (username: string, postId: string) => {
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    include: { author: true },
  });

  if (post.author.username === username) return;

  return await prisma.notification.create({
    data: {
      recipient: post.author.username,
      sender: username,
      type: "LIKE",
      postId,
    },
  });
};
