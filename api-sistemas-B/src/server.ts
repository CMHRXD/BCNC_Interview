import express from "express";
import dotenv from "dotenv";
import { authenticateDB } from "./config/sequalize";
import { facturasRoutes } from "./routes/facturas_route";

const app = express();

app.use(express.json()); // Enable JSON parsing

// Get enviroment variables
dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

// Connect to the database and sync the models
authenticateDB();

// Routes
app.use("/bills", facturasRoutes);

const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || "localhost";

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
  console.log(`Database: ${process.env.DATABASE_NAME}`);
});
