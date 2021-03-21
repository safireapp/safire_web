// Get the authenticated user's keys or store them in the db

import withSession from "@lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-iron-session";
import prisma from "@lib/prisma";
import { User } from ".prisma/client";

export default withSession(
  async (req: NextApiRequest & { session: Session }, res: NextApiResponse) => {
    const { id }: User = req.session.get("user");
    if (!id) return res.status(403).json({ message: "You are not logged in!" });

    switch (req.method) {
      case "GET":
        const keys = await prisma.user.findUnique({
          where: { id },
          select: { public_key: true, enc_priv_key: true },
        });

        return res.json(keys);
      case "POST":
        try {
          const { public_key, enc_priv_key } = req.body;
          const newKeys = await prisma.user.update({
            where: { id },
            data: { public_key, enc_priv_key },
            select: { public_key: true, enc_priv_key: true },
          });

          return res.json(newKeys);
        } catch (err) {
          console.error(err);
          return res.status(500).json({ message: err.message });
        }
      default:
        return res.status(405).end();
    }
  }
);
