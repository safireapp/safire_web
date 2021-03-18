import prisma from "@lib/prisma";

export default async (recipient: string, sender: string) => {
  await prisma.notification.deleteMany({
    where: {
      sender,
      recipient,
      type: "FOLLOW",
    },
  });
};
