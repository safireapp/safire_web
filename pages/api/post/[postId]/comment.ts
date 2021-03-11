// Create a Comment API route

import withSession from "@lib/session";
import { PrismaClient, User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-iron-session";

const prisma = new PrismaClient();

export default withSession(
  async (req: NextApiRequest & { session: Session }, res: NextApiResponse) => {
    switch (req.method) {
      case "POST":
        try {
          const user: User = await req.session.get("user");
          if (!user)
            return res.status(403).json({ message: "You are not logged in!" });

          const { body } = req.body;
          const postId = req.query.postId as string;

          if (!body?.trim())
            return res.status(400).json({ body: "body must not be empty" });

          const comment = await prisma.comment.create({
            data: {
              authorId: user.id,
              postId,
              body,
            },
          });
          return res.json(comment);
        } catch (err) {
          console.error(err);
          return res.status(500).json({ message: err.message });
        }
      default:
        return res.status(405).end();
    }
  }
);
