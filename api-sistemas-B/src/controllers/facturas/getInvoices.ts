import { Request, Response } from "express";
import Facturas from "../../models/Invoices";
import { Op } from "sequelize";

const getFacturas = async (req: Request, res: Response): Promise<Response> => {
  const { fecha_inicio, fecha_fin } = req.query;

  const whereClause = {} as any;

  if (fecha_inicio) {
    whereClause.date_issued = { [Op.gte]: new Date(fecha_inicio as string) };
  }
  if (fecha_fin) {
    whereClause.date_issued = whereClause.date_issued
      ? {
          ...whereClause.date_issued,
          [Op.lte]: new Date(fecha_fin as string),
        }
      : { [Op.lte]: new Date(fecha_fin as string) };
  }

  if (new Date(fecha_inicio as string) > new Date(fecha_fin as string)) {
    return res.status(400).json({
      error: "La fecha de inicio no puede ser mayor a la fecha de fin",
    });
  }

  try {
    const facturas = await Facturas.findAll({ where: whereClause });
    return res.status(200).json(facturas);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export { getFacturas };
