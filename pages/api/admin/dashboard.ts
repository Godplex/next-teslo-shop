import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { Order, Product, User } from "../../../src/models";

type Data =
  | {
      message: string;
    }
  | {
      numberOrders: number;
      paidOrders: number;
      notPaidOrders: number;
      numberOfClients: number;
      numberOfProducts: number;
      productsWithNoInventory: number;
      lowInventory: number;
    };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await db.connect();

  const [
    numberOrders,
    paidOrders,
    numberOfClients,
    numberOfProducts,
    productsWithNoInventory,
    lowInventory,
  ] = await Promise.all([
    Order.count(),
    Order.find({ isPaid: true }).count(),
    User.find({ role: "client" }).count(),
    Product.count(),
    Product.find({ inStock: 0 }).count(),
    Product.find({ inStock: { $lte: 10 } }).count(),
  ]);

  await db.disconnect();

  res.status(200).json({
    numberOrders,
    paidOrders,
    notPaidOrders: numberOrders - paidOrders,
    numberOfClients,
    numberOfProducts,
    productsWithNoInventory,
    lowInventory,
  });
}
