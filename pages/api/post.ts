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
          const user: User = req.session.get("user");
          if (!user)
            return res.status(400).json({ message: "You are not logged in!" });

          const { body } = req.body;

          if (!body?.trim())
            return res.status(400).json({ body: "body must not be empty" });

          // include comments and likes if needed
          const post = await prisma.post.create({
            data: {
              body,
              authorId: user.id,
            },
          });

          return res.json(post);
        } catch (err) {console.error(err); return res.status(500).json({ message: err.message })}
        
      default:
        return res.status(405).end();
    }
  }
);
