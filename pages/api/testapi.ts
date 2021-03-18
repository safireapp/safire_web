// This is a test API for testing anything related to API

import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const users = await prisma.post.findMany({
    orderBy: {
      created_at: 'desc'
    },
  });

  return res.json(users);
};
