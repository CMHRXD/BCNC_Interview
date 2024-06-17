import { Router } from "express";
import validateSession from "../middlewares/validateSession";
import { createFactura, getFacturas } from "../controllers/facturas";

const router = Router();

router.get("/", validateSession, getFacturas);
router.post("/", validateSession, createFactura);

export { router as facturasRoutes };
