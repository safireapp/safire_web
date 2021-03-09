import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import cloudinary from "../../../lib/cloudinary";
import DatauriParser from "datauri/parser";
import multer from "multer";
import initMiddleware from "../../../lib/initMiddleware";
import { UploadApiErrorResponse, UploadApiResponse } from "cloudinary";
import withSession from "../../../lib/session";
import { User } from "../../../util/types";
import { Session } from "next-iron-session";
import { PrismaClient } from "@prisma/client";

const parser = new DatauriParser();
const prisma = new PrismaClient();
const upload = multer();

const multerAny = initMiddleware(upload.any());
const allowed_types = [
  "image/png",
  "image/jpeg",
  "image/gif",
  "image/jpg",
  "image/x-png",
];

type NextApiRequestWithFormData = NextApiRequest & {
  files: any[];
  session: Session;
};

export default withSession(
  async (req: NextApiRequestWithFormData, res: NextApiResponse) => {
    switch (req.method) {
      case "GET":
        res.status(405).end();
        break;
      case "POST":
        const user: User = await req.session.get("user");
        if (!user) return res.json({ message: "You are not logged in" });

        await multerAny(req, res);

        const file = await req.files[0];
        if (!allowed_types.includes(file.mimetype))
          return res
            .status(400)
            .json({ message: "Unexpected file type uploaded" });

        if (file.size > 5242880)
          return res
            .status(400)
            .json({ message: "Image size must not be greater than 5mb" });

        const file64 = parser.format(
          path.extname(file.originalname).toString(),
          file.buffer
        );

        await cloudinary(
          file64.content,
          {
            public_id: `${user.username}_profile_img`,
            overwrite: true,
            transformation: { quality: "auto:good" },
            resource_type: "image",
          },
          async (error: UploadApiErrorResponse, result: UploadApiResponse) => {
            if (error) return res.json({ error: error.message });

            const updatedUser = await prisma.user.update({
              where: { id: user.id },
              data: { imageUrl: result.url },
            });

            req.session.set("user", updatedUser);
            await req.session.save();

            return res.json({ result });
          }
        );
        break;
      default:
        res.status(405).end();
        break;
    }
  }
);

export const config = {
  api: {
    bodyParser: false,
  },
};
