import { Router } from "express";
import { login } from "../controllers/auth/login";

const router = Router();

router.post("/token", login);

export { router as authRoutes };
