import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const posts = await prisma.post.findMany({
      include: { comments: true, likes: true },
    });
    return res.json(posts);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};
