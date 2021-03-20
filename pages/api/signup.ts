// Signup route

import { NextApiRequest, NextApiResponse } from "next";
import { validateSignupData } from "@utils/userValidators";
import bcrypt from "bcryptjs";
import sgMail from "@sendgrid/mail";
import jwt from "jsonwebtoken";
import { text, html } from "@lib/email";
import prisma from "@lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {
      firstName,
      lastName,
      username,
      email,
      password,
      confirmPassword,
    } = req.body;
    const newUser = {
      firstName,
      lastName,
      username,
      email,
      password,
      confirmPassword,
    };
    const { valid, errors } = validateSignupData(newUser);

    if (!valid) return res.status(400).json(errors);

    const hashedPassword = await bcrypt.hash(password, 10);

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    jwt.sign(
      { firstName, lastName, username, email },
      process.env.EMAIL_SECRET,
      { expiresIn: "1d" },
      (err, emailToken) => {
        const url = `http://localhost:3000/api/confirmation/${emailToken}`;
        const msg = {
          to: email,
          from: process.env.EMAIL_FROM,
          subject: "Confim Your Email",
          text: text(url),
          html: html(url),
        };
        sgMail
          .send(msg)
          .then(() => {
            console.log("Email sent");
          })
          .catch((error) => {
            console.error(error);
            return res.status(500).json({ message: err.message });
          });
      }
    );

    await prisma.user.create({
      data: {
        firstName,
        lastName,
        username,
        email,
        password: hashedPassword,
        role: "USER",
        confirmed: false,
        verified: false,
      },
    });

    return res.json({
      message: "Signup success! Please check your inbox to confirm your email.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "User already exists" });
  }
};
