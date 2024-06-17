import { NextFunction as next, Request as req, Response as res } from "express";
import { Request, Response } from "oauth2-server";
import oauth from "../config/oauth_server";
import { UserAttributes } from "../models/Users";

declare global {
  namespace Express {
    interface Request {
      user?: UserAttributes;
    }
  }
}

const validateSession = (req: req, res: res, next: next) => {
  const request = new Request(req);
  const response = new Response(res);

  oauth
    .authenticate(request, response)
    .then((token) => {
      req.user = token.user as UserAttributes;
      next();
    })
    .catch((err) => {
      res.status(err.code || 500).json(err);
    });
};

export default validateSession;
