// GET route: Get the authenticated user details
// POST route: Edit the profile information of the authenticated user

import { PrismaClient, User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-iron-session";
import withSession from "@lib/session";
import { reduceUserDetails } from "@utils/userValidators";
import _ from "lodash";

const prisma = new PrismaClient();

export default withSession(
  async (req: NextApiRequest & { session: Session }, res: NextApiResponse) => {
    const user: User = await req.session.get("user");
    if (!user) return res.json({ message: "You are not logged in" });

    switch (req.method) {
      case "GET":
        // Simply get the user
        const userWithMoreDetails = await prisma.user.findUnique({
          where: { id: user.id },
          include: { likes: true, posts: true, comments: true },
        });

        const userWithLessDetails = _.omit(
          userWithMoreDetails,
          "likes",
          "posts",
          "comments"
        );

        req.session.set("user", userWithLessDetails);
        await req.session.save();

        return res.json(userWithMoreDetails);
      case "POST":
        try {
          const userDetails = reduceUserDetails(req.body);
          const updatedUser = await prisma.user.update({
            where: { id: user.id },
            data: userDetails,
          });

          req.session.set("user", updatedUser);
          await req.session.save();

          return res.json(updatedUser);
        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: error.message });
        }
      default:
        res.status(405).end();
        break;
    }
  }
);
