import { Handler, SessionOptions, withIronSession } from "next-iron-session";

const sessionConfig: SessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD,
  cookieName: "user-session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production" ? true : false,
    maxAge: 10 * 365 * 24 * 60 * 60,
  },
};

export default function withSession(handler: Handler) {
  return withIronSession(handler, sessionConfig);
}
