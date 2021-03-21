// Login route

import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@lib/prisma";
import bcrypt from "bcryptjs";
import withSession from "@lib/session";
import { Session } from "next-iron-session";
import { validateLoginData } from "@utils/userValidators";


export default withSession(
  async (req: NextApiRequest & { session: Session }, res: NextApiResponse) => {
    try {
      const { email, password } = req.body;
      const { valid, errors } = validateLoginData({ email, password });
      if (!valid) return res.status(400).json(errors);

      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) return res.status(404).json({ message: "User not found" })

      if (!user.confirmed)
        return res.json({ message: "Please confirm your email to login" });

      const passwordIsValid = await bcrypt.compare(password, user.password);

      if (!passwordIsValid) {
        return res.status(403).json({ password: "Password is incorrect" });
      }
      // TODO: exclude the password and following list
      req.session.set("user", user);
      await req.session.save();

      return res.json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error.message});
    }
  }
);
