// Delete API route: If you are the OP
// Get API route: Anyone can get a comment by its id.

import deleteNotificationOnComment from "@lib/notification-handlers/deleteNotificationOnComment";
import withSession from "@lib/session";
import { User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-iron-session";
import prisma from "@lib/prisma";

export default withSession(
  async (req: NextApiRequest & { session: Session }, res: NextApiResponse) => {
    try {
      const commentId = req.query.commentId as string;
      const comment = await prisma.comment.findUnique({
        where: {
          id: commentId,
        },
      });

      if (!comment)
        return res.status(404).json({ message: "Comment not found" });

      switch (req.method) {
        case "DELETE":
          const user: User = req.session.get("user");
          if (!user)
            return res.status(403).json({ message: "You are not logged in!" });

          if (comment.authorId !== user.id)
            return res.status(403).json({ message: "Unauthorized!" });

          await prisma.comment.delete({
            where: {
              id: commentId,
            },
          });

          await deleteNotificationOnComment(user.username, comment.postId, commentId);

          return res.json({ message: "Comment deleted successfully" });
        case "GET":
          return res.json(comment);
        default:
          return res.status(405).end();
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: err.message });
    }
  }
);
