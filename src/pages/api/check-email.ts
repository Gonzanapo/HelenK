import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const email = req.query.email as string;
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (user) {
      res.status(200).json({ message: "Email found" });
    } else {
      res.status(404).json({ message: "Email not found" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method ?? "unknown"} Not Allowed`);
  }
}
