// Mark the notifications as read

import withSession from "@lib/session";
import { PrismaClient, User } from "@prisma/client";
// import authCheck from "@utils/authCheck";
import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-iron-session";

const prisma = new PrismaClient();

export default withSession(
  async (req: NextApiRequest & { session: Session }, res: NextApiResponse) => {
    switch (req.method) {
      case "POST":
        try {
          const user: User = req.session.get("user");
          const { notificationIds } = req.body;
          if (!user)
            return res.status(400).json({ message: "You are not logged in!" });
          // await authCheck(req, res);

          await prisma.notification.updateMany({
            where: {
              id: {
                in: notificationIds,
              },
            },
            data: {
              read: true,
            },
          });

          return res.json({ message: "Notifications marked as read" });
        } catch (err) {
          console.error(err);
          return res.status(500).json({ message: err.message });
        }

      default:
        return res.status(405).end();
    }
  }
);
