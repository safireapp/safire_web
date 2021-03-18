// Get all posts route

import prisma from "@lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const posts = await prisma.post.findMany({
      include: { comments: true, likes: true },
      orderBy: { created_at: 'asc' }
    });
    return res.json(posts);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};
