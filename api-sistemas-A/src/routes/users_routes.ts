import Router, { Request, Response } from "express";
import { createUser, getUsers } from "../controllers/users";

const router = Router();

// Create a new user
router.post("/", createUser);

// Get all users
router.get("/", getUsers);

export { router as usersRoutes };
