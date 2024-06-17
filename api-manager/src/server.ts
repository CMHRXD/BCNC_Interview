import express from "express";
import dotenv from "dotenv";
import integrateInvoicesAPIs from "./controllers/integrateInvoicesAPIs";

const app = express();

app.use(express.json()); // Enable JSON parsing
app.use(express.urlencoded({ extended: true })); // Enable URL-encoded parsing

// Get enviroment variables
dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

app.get("/integrate", integrateInvoicesAPIs);

const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || "localhost";

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});
