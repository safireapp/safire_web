// Get a list of followers of a user

import withSession from "@lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-iron-session";
import prisma from "@lib/prisma";

export default withSession(
  async (req: NextApiRequest & { session: Session }, res: NextApiResponse) => {
    try {
      const username = req.query.username as string;
      const users = await prisma.user.findMany({
        where: {
          following: {
            has: username
          },
        },
        select: {
          id: true,
          username: true,
          firstName: true,
          lastName: true,
          imageUrl: true,
          verified: true,
        },
      });

      return res.json(users);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: err.message });
    }
  }
);
