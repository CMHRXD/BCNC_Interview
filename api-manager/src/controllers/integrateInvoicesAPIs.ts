import { Request, Response } from "express";
import dotenv from "dotenv";
import { facturas } from "../utils/interfaces/facturas";
import { invoices } from "../utils/interfaces/invoices";
import { estado } from "../utils/enums/estado";
import { status } from "../utils/enums/status";
import getFacturas from "../services/getFacturas";
import sendInvoices from "../services/sendInvoices";

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

const integrateInvoicesAPIs = async (req: Request, res: Response) => {
  const { fecha_inicio, fecha_fin } = req.query;

  //Get invoices from sistema A
  const facturas = await getFacturas(
    fecha_inicio as string,
    fecha_fin as string
  );

  //Format invoices to sistema B format
  const invoicesFormatted: invoices[] = facturas.map((invoice: facturas) => {
    return {
      invoice_id: invoice.id,
      customer: invoice.cliente,
      amount_due: invoice.monto,
      date_issued: invoice.fecha_emision,
      status: invoice.estado === estado.pagada ? status.paid : status.unpaid,
    };
  });

  // Send invoices to sistema B
  const result = await sendInvoices(invoicesFormatted);

  res.send(result);
};

export default integrateInvoicesAPIs;
