import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case "GET":
      res
        .status(400)
        .json({ message: "Debe de especificar el query de busqueda." });
    default:
      return res.status(400).json({
        message: "Bad request.",
      });
  }
}
