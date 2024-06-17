import dotenv from "dotenv";
import { facturas } from "../utils/interfaces/facturas";

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

const getFacturas = async () => {
  const sistema_A = process.env.API_SISTEMA_A_URL;
  if (!process.env.CLIENT_ID || !process.env.CLIENT_SECRET) {
    throw new Error(
      "CLIENT_ID or CLIENT_SECRET is not set in the environment variables."
    );
  }

  const payload = new URLSearchParams({
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    grant_type: "client_credentials",
  });

  try {
    //Get auth from sistema A
    const auth = await fetch(`${sistema_A}/oauth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: payload,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data;
      });

    //Get invoices from sistema A
    const facturas: facturas[] = await fetch(
      `${sistema_A}/facturas?fecha_inicio=2024-06-15&fecha_fin=2024-06-20`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${auth.access_token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        return data;
      });

    return facturas;
  } catch (error) {
    throw new Error("Error getting invoices from sistema A");
  }
};

export default getFacturas;
