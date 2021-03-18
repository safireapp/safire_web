import prisma from "@lib/prisma";

export default async (recipient: string, sender: string) => {
  return await prisma.notification.create({
    data: {
      recipient,
      sender,
      type: "FOLLOW",
    },
  });
};
