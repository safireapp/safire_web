// Delete API route: If you are the OP
// Get API route: Anyone can get a post by its id.

import withSession from "@lib/session";
import { PrismaClient, User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-iron-session";

const prisma = new PrismaClient();

export default withSession(
  async (req: NextApiRequest & { session: Session }, res: NextApiResponse) => {
    try {
      const post = await prisma.post.findUnique({
        where: {
          id: req.query.postId as string,
        },
        include: {
          author: {
            select: {
              username: true,
              firstName: true,
              lastName: true,
              bio: true,
              website: true,
              location: true,
              imageUrl: true,
              role: true,
              verified: true,
            },
          },
          comments: true,
          likes: true,
        },
      });

      if (!post) return res.status(404).json({ message: "Post not found" });

      switch (req.method) {
        case "DELETE":
          const user: User = req.session.get("user");
          if (!user)
            return res.status(403).json({ message: "You are not logged in!" });

          if (post.authorId !== user.id)
            return res.status(403).json({ message: "Unauthorized!" });

          await prisma.post.delete({
            where: {
              id: req.query.postId as string,
            },
          });

          return res.json({ message: "Post deleted successfully" });
        case "GET":
          return res.json(post);
        default:
          return res.status(405).end();
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: err.message });
    }
  }
);
