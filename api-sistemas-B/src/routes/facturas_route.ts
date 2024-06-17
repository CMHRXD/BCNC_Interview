import { Router } from "express";
import validateKey from "../middlewares/validateKey";
import { createFactura, getFacturas } from "../controllers/facturas";

const router = Router();

router.get("/", validateKey, getFacturas);
router.post("/", createFactura);

export { router as facturasRoutes };
