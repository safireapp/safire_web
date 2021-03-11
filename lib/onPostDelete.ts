import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (postId: string) => {
  // delete all the likes related to this post
  await prisma.like.deleteMany({
    where: {
      postId: postId,
    },
  });

  // delete all the comments related to this post
  await prisma.comment.deleteMany({
    where: {
      postId: postId,
    },
  });

  // delete all the notifications related to this post
  await prisma.notification.deleteMany({
    where: {
      postId: postId,
    },
  });
};
