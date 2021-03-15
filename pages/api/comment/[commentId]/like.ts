// Like / Dislike API route (for comments)

import createNotificationOnLike from "@lib/notification-handlers/createNotificationOnLike";
import deleteNotificationOnUnlike from "@lib/notification-handlers/deleteNotificationOnUnlike";
import withSession from "@lib/session";
import { PrismaClient, User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-iron-session";

const prisma = new PrismaClient();

export default withSession(
  async (req: NextApiRequest & { session: Session }, res: NextApiResponse) => {
    try {
      const commentId = req.query.commentId as string;
      const user: User = await req.session.get("user");
      if (!user)
        return res.status(403).json({ message: "You are not logged in!" });

      const like = await prisma.like.findFirst({
        where: {
          commentId,
          userId: user.id,
        },
      });

      if (!like) {
        await prisma.like.create({
          data: {
            commentId,
            userId: user.id,
          },
        });

        await createNotificationOnLike(user.username, null, commentId);

        return res.json({ message: "Liked the comment" });
      } else {
        await prisma.like.deleteMany({
          where: {
            commentId,
            userId: user.id,
          },
        });

        await deleteNotificationOnUnlike(user.username, null, commentId);

        return res.json({ message: "Disliked the comment" });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: err.message });
    }
  }
);
