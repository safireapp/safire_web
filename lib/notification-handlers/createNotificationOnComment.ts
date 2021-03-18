import prisma from "@lib/prisma";

export default async (username: string, postId: string, commentId: string) => {
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
      postId,
      commentId,
      type: "COMMENT",
    },
  });
};
