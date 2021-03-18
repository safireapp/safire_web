// Anyone can get the user details of a particular username
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await prisma.user.findUnique({
    where: { username: req.query.username as string },
    include: { posts: true, comments: true, likes: true },
  });

  if (user) return res.json(user);
  else return res.status(404).json({ message: "User not found" });
};
