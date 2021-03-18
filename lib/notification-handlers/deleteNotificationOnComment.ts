import prisma from "@lib/prisma";

export default async (sender: string, postId: string, commentId: string) => {
  await prisma.notification.deleteMany({
    where: {
      sender,
      postId,
      commentId,
      type: "COMMENT",
    },
  });
};
