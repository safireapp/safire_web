import { User } from ".prisma/client";
import { AxiosResponse } from "axios";
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
  message?: string;
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

export type Context = {
  user: User;
  setUser: (value: React.SetStateAction<User>) => void;
  email: string;
  password: string;
  login: (userDetails: LoginData) => Promise<AxiosResponse<any>>;
  loading: boolean;
  setEmail: (value: React.SetStateAction<string>) => void;
  setPassword: (value: React.SetStateAction<string>) => void;
  setLoading: (value: React.SetStateAction<boolean>) => void;
}