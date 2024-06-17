import { Request, Response } from "express";
import Facturas from "../../models/Facturas";

const createFactura = async (req: Request, res: Response) => {
  try {
    const { cliente, monto, fecha_emision, estado } = req.body;
    const factura = await Facturas.create({
      cliente,
      monto,
      fecha_emision,
      estado,
    });
    res.status(201).json(factura);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export { createFactura };
