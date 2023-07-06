import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      const { email } = req.query;
      const user = await prisma.user.findUnique({
        where: {
          email: email as string,
        },
      });

      const emailExists = !!user;

      return res.status(200).json({ emailExists });
    }

    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({
      message: `Method ${req.method ?? "unknown"} Not Allowed`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "El email ya está registrado" });
  }
}
