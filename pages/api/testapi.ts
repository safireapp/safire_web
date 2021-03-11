// This is a test API for testing anything related to API

import { PrismaClient, User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const users = await prisma.post.findMany({
    orderBy: {
      created_at: 'desc'
    },
  });

  return res.json(users);
};
