import { Request, Response } from "express";
import Facturas from "../../models/Invoices";

enum status {
  paid = "paid",
  unpaid = "unpaid",
}

interface bills {
  invoice_id: number;
  customer: string;
  amount_due: number;
  date_issued: Date;
  status: status;
}

const createFactura = async (req: Request, res: Response) => {
  try {
    const data: bills[] = req.body;

    data.forEach(async (bill) => {
      const { invoice_id, customer, amount_due, date_issued, status } = bill;

      try {
        const invoiceExists = await Facturas.findByPk(invoice_id);
        if (!invoiceExists) {
          await Facturas.create({
            id: invoice_id,
            customer,
            amount_due,
            date_issued,
            status,
          });
        }
      } catch (error) {}
    });

    res.status(201).json({ message: "Facturas importadas con éxito." });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export { createFactura };
