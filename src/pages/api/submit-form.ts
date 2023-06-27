import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      // Obtener los datos del formulario desde el cuerpo de la solicitud
      const data = req.body as {
        email: string;
        password: string;
      };

      // Crear un nuevo registro de usuario en la base de datos
      await prisma.user.create({
        data: {
          email: data.email,
          password: data.password,
        },
      });

      // Devolver una respuesta al lado del cliente
      res.status(200).json({ message: "Formulario enviado correctamente" });
    } catch (error) {
      // Ocurrió un error al enviar consultas a la base de datos
      console.error(error);
      res
        .status(500)
        .json({ message: "Ocurrió un error al enviar el formulario" });
    }
  } else {
    // Manejar otros métodos HTTP
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method ?? 'unknown'} Not Allowed`);
  }
}