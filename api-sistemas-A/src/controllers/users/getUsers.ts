import { Request, Response } from "express";
import User from "../../models/Users";

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
export { getUsers };
