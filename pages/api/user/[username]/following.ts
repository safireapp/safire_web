// Get a list of users who are followed by the user

import withSession from "@lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-iron-session";
import prisma from "@lib/prisma";

export default withSession(
  async (req: NextApiRequest & { session: Session }, res: NextApiResponse) => {
    try {
      const username = req.query.username as string;
      const followingList = await prisma.user.findUnique({
        where: {
          username,
        },
        select: {
          following: true,
        },
      });

      const users = await prisma.user.findMany({
        where: {
          username: {
            in: followingList.following,
          },
        },
        select: {
          id: true,
          username: true,
          firstName: true,
          lastName: true,
          imageUrl: true,
          verified: true
        }
      });

      return res.json(users);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: err.message });
    }
  }
);
