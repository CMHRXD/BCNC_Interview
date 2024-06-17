import { Request as req, Response as res } from "express";
import oauth from "../../config/oauth_server";
import { Request, Response } from "oauth2-server";

const login = async (req: req, res: res) => {
  const request = new Request(req);
  const response = new Response(res);
  oauth
    .token(request, response)
    .then((data) => {
      res.json({
        access_token: data.accessToken,
        expires_in: data.accessTokenExpiresAt,
      });
    })
    .catch((err) => {
      res.status(err.code || 500).json(err);
    });
};

export { login };
