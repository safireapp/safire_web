// Verify a user (Admin Only)

import withSession from "@lib/session";
import { User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-iron-session";
import prisma from "@lib/prisma";

export default withSession(
  async (req: NextApiRequest & { session: Session }, res: NextApiResponse) => {
    try {
      const user: User = await req.session.get("user");
      const usernameToBeVerified = req.query.username as string;
      if (!user)
        return res.status(403).json({ message: "You are not logged in!" });

      if (user.role !== "ADMIN")
        return res.status(403).json({ message: "Unauthorized!" });

      const verifiedUser = await prisma.user.update({
        where: {
          username: usernameToBeVerified,
        },
        data: {
          verified: true,
        },
      });

      return res.json(verifiedUser);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: err.message });
    }
  }
);
