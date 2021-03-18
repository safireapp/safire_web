import prisma from "@lib/prisma";

export default async (
  username: string,
  postId: string | null,
  commentId: string | null
) => {
  if (postId) {
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
  }

  if (commentId) {
    const comment = await prisma.comment.findUnique({
      where: {
        id: commentId,
      },
      include: { author: true },
    });

    if (comment.author.username === username) return;

    return await prisma.notification.create({
      data: {
        recipient: comment.author.username,
        sender: username,
        type: "LIKE",
        commentId,
      },
    });
  }
};
