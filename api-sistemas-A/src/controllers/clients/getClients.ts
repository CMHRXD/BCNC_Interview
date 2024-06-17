import { Request, Response } from "express";
import Clients from "../../models/Clients";

const getClients = async (req: Request, res: Response) => {
  try {
    const clients = await Clients.findAll();
    res.json(clients);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export { getClients };
