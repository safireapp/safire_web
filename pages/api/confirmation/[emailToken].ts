import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { Session } from "next-iron-session";
import withSession from "../../../lib/session";
import { User } from "../../../util/types";

const prisma = new PrismaClient();

export default withSession(
  async (req: NextApiRequest & { session: Session }, res: NextApiResponse) => {
    const token: string = req.query.emailToken as string;
    try {
      const user: User = jwt.verify(token, process.env.EMAIL_SECRET) as User;
      await prisma.user.update({
        where: { id: user.id },
        data: { confirmed: true },
      });

      req.session.set("user", user);
      await req.session.save();
    } catch (e) {
      console.error(e);
      res.json({ message: e.message });
    } finally {
      return res.redirect("http://localhost:3000");
    }
  }
);
