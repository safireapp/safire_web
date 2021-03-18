// Send a DM

import createNotificationOnMessage from "@lib/notification-handlers/createNotificationOnMessage";
import withSession from "@lib/session";
import { User } from "@prisma/client";
import { validateDM } from "@utils/userValidators";
import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-iron-session";
import prisma from "@lib/prisma";

export default withSession(
  async (req: NextApiRequest & { session: Session }, res: NextApiResponse) => {
    const user: User = req.session.get("user");
    const { message } = req.body;
    const recipientId = req.query.recipientId as string;

    const recipientDetails = await prisma.user.findUnique({
      where: { id: recipientId },
    });

    const { errors, valid } = await validateDM(
      recipientId,
      user,
      recipientDetails
    );

    if (!valid) return res.status(400).json(errors);

    switch (req.method) {
      case "POST":
        try {
          // Send a message
          if (!message?.trim()) {
            return res
              .status(400)
              .json({ message: "Message must not be empty" });
          }

          await prisma.message.create({
            data: {
              message,
              recipientId,
              senderId: user.id,
            },
          });

          await createNotificationOnMessage(
            user.username,
            recipientDetails.username
          );

          return res.json({ message: "Message sent successfully" });
        } catch (err) {
          console.error(err);
          return res.status(500).json({ message: err.message });
        }
      case "GET":
        // Get the message history between those 2 users and mark it as read.
        const getMessage = prisma.message.findMany({
          where: {
            senderId: {
              in: [user.id, recipientId],
            },
            recipientId: {
              in: [user.id, recipientId],
            },
          },
        });

        const markAsRead = prisma.message.updateMany({
          where: {
            recipientId: user.id,
            senderId: recipientId,
          },
          data: {
            read: true,
          },
        });

        const [messages] = await prisma.$transaction([getMessage, markAsRead]);

        return res.json(messages);
      default:
        return res.status(405).end();
    }
  }
);
