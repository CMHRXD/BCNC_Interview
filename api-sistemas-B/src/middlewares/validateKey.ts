import { NextFunction as next, Request as req, Response as res } from "express";
import dotenv from "dotenv";
0;
const validateKey = (req: req, res: res, next: next) => {
  dotenv.config({
    path: `.env.${process.env.NODE_ENV}`,
  });

  const X_API_KEY = process.env.X_API_KEY;

  const reqApiKey = req.headers["x-api-key"];

  if (!reqApiKey) {
    return res.status(401).json({
      message: "API Key is required",
    });
  }

  if (reqApiKey !== X_API_KEY) {
    return res.status(401).json({
      message: "Invalid API Key",
    });
  }

  next();
};

export default validateKey;
