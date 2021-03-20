// Email Confirmation API route

import { User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { Session } from "next-iron-session";
import withSession from "@lib/session";
import prisma from "@lib/prisma";

type Token = {
  firstName?: string
  lastName?: string
  username: string
  email: string
}

export default withSession(
  async (req: NextApiRequest & { session: Session }, res: NextApiResponse) => {
    const token: string = req.query.emailToken as string;
    try {
      const userToken: Token = jwt.verify(token, process.env.EMAIL_SECRET) as Token;
      const user = await prisma.user.update({
        where: { username: userToken.username },
        data: { confirmed: true },
      });

      // TODO: exclude the password and following list
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
