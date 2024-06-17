import { invoices } from "../utils/interfaces/invoices";
import dotenv from "dotenv";

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});
const sendInvoices = async (invoices: invoices[]) => {
  const sistema_B = process.env.API_SISTEMA_B_URL;

  if (!process.env.X_API_KEY) {
    throw new Error("API_KEY is not set in the environment variables.");
  }

  try {
    const result = await fetch(`${sistema_B}bills`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.X_API_KEY,
      },
      body: JSON.stringify(invoices),
    })
      .then((response) => response.json())
      .then((data) => data);

    return result;
  } catch (error) {
    throw new Error("Error sending invoices to sistema B");
  }
};

export default sendInvoices;
