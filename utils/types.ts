import { NextApiRequest } from "next";
import { Session } from "next-iron-session";

export type SignupData = {
  firstName?: string;
  lastName?: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginData = {
  email: string;
  password: string;
};

export type Error = {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export type EditUserDetails = {
  firstName?: string;
  lastName?: string;
  bio?: string;
  website?: string;
  location?: string;
};

export type NextApiRequestWithFormData = NextApiRequest & {
  files: any[];
  session: Session;
};
