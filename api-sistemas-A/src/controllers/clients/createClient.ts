import { Request, Response } from "express";
import Clients from "../../models/Clients";
import User from "../../models/Users";

const createClient = async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk(req.body.userId);
    if (!user) {
      return res.status(401).json({ error: "Invaild User" });
    }
    const client = await Clients.create({
      clientId: req.body.clientId,
      clientSecret: req.body.clientSecret,
      grants: req.body.grants,
      userId: req.body.userId,
    });
    res.status(201).json(client);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
export { createClient };
