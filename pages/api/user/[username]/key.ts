// Get a user's public key

import withSession from "@lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-iron-session";
import prisma from "@lib/prisma";

export default withSession(
  async (req: NextApiRequest & { session: Session }, res: NextApiResponse) => {
    try {
      const username = req.query.username as string;
      const key = await prisma.user.findUnique({
        where: {
          username
        },
        select: {
          public_key: true
        },
      });

      return res.json(key);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: err.message });
    }
  }
);
