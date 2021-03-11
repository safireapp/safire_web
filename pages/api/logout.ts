// Logout route

import withSession from "@lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-iron-session";

export default withSession(
  async (req: NextApiRequest & { session: Session }, res: NextApiResponse) => {
    req.session.destroy();
    return res.status(200).json({ response: true });
  }
);
