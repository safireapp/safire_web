import prisma from "@lib/prisma";

export default async (sender: string, recipient: string) => {
  return await prisma.notification.create({
    data: {
      recipient,
      sender,
      type: "NEW_DM",
    },
  });
};
