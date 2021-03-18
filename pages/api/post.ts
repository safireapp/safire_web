// Create a post route

import checkForMention from "@lib/checkForMention";
import withSession from "@lib/session";
import { User } from "@prisma/client";
import prisma from "@lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-iron-session";

export default withSession(
  async (req: NextApiRequest & { session: Session }, res: NextApiResponse) => {
    switch (req.method) {
      case "POST":
        try {
          const user: User = req.session.get("user");
          if (!user)
            return res.status(400).json({ message: "You are not logged in!" });

          const { body } = req.body;

          if (!body?.trim())
            return res.status(400).json({ message: "body must not be empty" });

          if (body.length > 150)
            return res
              .status(400)
              .json({ message: "Body must be shorter than 150 characters" });

          // include comments and likes if needed
          const post = await prisma.post.create({
            data: {
              body,
              authorId: user.id,
            },
          });

          checkForMention(post)

          return res.json(post);
        } catch (err) {
          console.error(err);
          return res.status(500).json({ message: err.message });
        }

      default:
        return res.status(405).end();
    }
  }
);
