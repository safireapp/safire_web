// Follow a user

import createNotificationOnFollow from "@lib/notification-handlers/createNotificationOnFollow";
import deleteNotificationOnUnfollow from "@lib/notification-handlers/deleteNotificationOnUnfollow";
import withSession from "@lib/session";
import { User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-iron-session";
import prisma from "@lib/prisma";

export default withSession(
  async (req: NextApiRequest & { session: Session }, res: NextApiResponse) => {
    try {
      const isLoggedIn: User = await req.session.get("user");
      const username = req.query.username as string;
      if (!isLoggedIn)
        return res.status(403).json({ message: "You are not logged in!" });

      const currentUser = await prisma.user.findUnique({
        where: {
          id: isLoggedIn.id,
        },
        select: {
          // only the following list (<-- maybe?)
          following: true,
        },
      });

      if (isLoggedIn.username === username)
        return res.status(403).json({ message: "You cannot follow yourself" });

      // user already follows the person or not
      if (!currentUser.following.includes(username)) {
        // follow the person by adding their username to the list
        await prisma.user.update({
          where: {
            id: isLoggedIn.id,
          },
          data: {
            following: [...currentUser.following, username],
          },
        });

        createNotificationOnFollow(username, isLoggedIn.username)
        return res.json({ message: `You started following ${username}` });
      } else {
        // then unfollow the person and remove it from his following list
        await prisma.user.update({
          where: {
            id: isLoggedIn.id,
          },
          data: {
            following: currentUser.following.filter(
              (name) => name !== username
            ),
          },
        });

        deleteNotificationOnUnfollow(username, isLoggedIn.username);
        return res.json({ message: `You unfollowed ${username}` });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: err.message });
    }
  }
);
