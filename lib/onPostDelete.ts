import prisma from "@lib/prisma";

export default async (postId: string) => {
  // delete all the likes related to this post
  const deleteLikes = prisma.like.deleteMany({
    where: {
      postId: postId,
    },
  });

  // delete all the comments related to this post
  const deleteComments = prisma.comment.deleteMany({
    where: {
      postId: postId,
    },
  });

  // delete all the notifications related to this post
  const deleteNotifs = prisma.notification.deleteMany({
    where: {
      postId: postId,
    },
  });

  const deletePost = prisma.post.delete({
    where: {
      id: postId,
    },
  });

  await prisma.$transaction([
    deleteLikes,
    deleteNotifs,
    deleteComments,
    deletePost,
  ]);
};
