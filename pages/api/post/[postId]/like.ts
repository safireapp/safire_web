// Like / Dislike API route

import createNotificationOnLike from "@lib/notification-handlers/createNotificationOnLike";
import deleteNotificationOnUnlike from "@lib/notification-handlers/deleteNotificationOnUnlike";
import withSession from "@lib/session";
import { User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-iron-session";
import prisma from "@lib/prisma";

export default withSession(
  async (req: NextApiRequest & { session: Session }, res: NextApiResponse) => {
    try {
      const postId = req.query.postId as string;
      const user: User = await req.session.get("user");
      if (!user)
        return res.status(403).json({ message: "You are not logged in!" });

      const like = await prisma.like.findFirst({
        where: {
          postId,
          userId: user.id,
        },
      });

      if (!like) {
        await prisma.like.create({
          data: {
            postId,
            userId: user.id,
          },
        });

        await createNotificationOnLike(user.username, postId, null)

        return res.json({ message: "Liked the post" });
      } else {
        await prisma.like.deleteMany({
          where: {
            postId,
            userId: user.id,
          },
        });

        await deleteNotificationOnUnlike(user.username, postId, null)

        return res.json({ message: "Disliked the post" });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: err.message });
    }
  }
);
