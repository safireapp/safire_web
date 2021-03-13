import withSession from "@lib/session";
import { User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-iron-session";

export default withSession(
  (req: NextApiRequest & { session: Session }, res: NextApiResponse) => {
    const user: User = req.session.get("user");

    if (!user)
      return res.status(400).json({ message: "You are not logged in!" });
  }
);
