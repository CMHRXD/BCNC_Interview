import Router from "express";
import { createClient, getClients } from "../controllers/clients";

const router = Router();

// Create a new client
router.post("/", createClient);

// Get all clients
router.get("/", getClients);

export { router as clientsRoutes };
