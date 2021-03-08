import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-iron-session";
import withSession from "../../lib/session";
import { User } from "../../util/types";
import { reduceUserDetails } from "../../util/userValidators";

const prisma = new PrismaClient();

export default withSession(
  async (req: NextApiRequest & { session: Session }, res: NextApiResponse) => {
    const user: User = await req.session.get("user");
    if (!user) return res.json({ message: "You are not logged in" });

    if (req.method === "GET") {
      // Simply get the user
      return res.json(user);
    } else if (req.method === "POST") {
      // Update the user details
      const userDetails = reduceUserDetails(req.body);
      const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: userDetails,
      });

      req.session.set("user", updatedUser);
      await req.session.save();

      return res.json(updatedUser);
    }
  }
);
