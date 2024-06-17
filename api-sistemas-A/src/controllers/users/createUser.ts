import { Request, Response } from "express";
import User from "../../models/Users";

const createUser = async (req: Request, res: Response) => {
  try {
    const user = await User.create({
      username: req.body.username,
      password: req.body.password,
    });
    res.status(201).json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
export { createUser };
