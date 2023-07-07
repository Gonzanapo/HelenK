import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, password } = req.body as { email: string; password: string };
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (user && user.password === password) {
      res.status(200).json({ message: "Login successful" });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method ?? "unknown"} Not Allowed`);
  }
}

//VAMOS BOCA CARAJO