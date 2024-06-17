import { Client as OAuthClient, Token as OAuthToken } from "oauth2-server";
import jwt from "jsonwebtoken";
import Client from "./Clients";
import User, { UserAttributes } from "./Users";
import dotenv from "dotenv";

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

export interface jwtPayload {
  client_id: string;
  user_id: number;
  scope: string;
  exp: number;
}

const oauthModel = {
  getClient: async (clientId: string, clientSecret: string) => {
    const client = await Client.findOne({ where: { clientId, clientSecret } });
    return client ? client.toJSON() : null;
  },

  saveToken: async (
    token: OAuthToken,
    client: OAuthClient,
    user: UserAttributes
  ) => {
    const accessToken = {
      accessToken: token.accessToken,
      accessTokenExpiresAt: token.accessTokenExpiresAt,
      client: client,
      user: user,
    };
    return accessToken;
  },

  getAccessToken: async (accessToken: string) => {
    try {
      const decoded = jwt.verify(
        accessToken,
        process.env.TOKEN_SECRET as string
      ) as jwtPayload;
      const client = await Client.findOne({
        where: { clientId: decoded.client_id },
      });
      if (!client) {
        return null;
      }
      return {
        accessToken,
        accessTokenExpiresAt: new Date(decoded.exp * 1000),
        client: client.toJSON(),
        user: { id: decoded.user_id },
      };
    } catch (error) {
      return null;
    }
  },

  verifyScope: async (token: OAuthToken, scope: string) => {
    return token.scope === scope;
  },

  getUserFromClient: async (client: OAuthClient) => {
    const user = await User.findOne({ where: { id: client.id } });
    return user ? user.toJSON() : null;
  },

  generateAccessToken: async (
    client: OAuthClient,
    user: UserAttributes,
    scope: string | string[]
  ) => {
    const payload = {
      client_id: client.clientId,
      user_id: user.id,
      scope: Array.isArray(scope) ? scope.join(" ") : scope,
    };
    return jwt.sign(payload, process.env.TOKEN_SECRET as string, {
      expiresIn: "1h",
    });
  },
};

export default oauthModel;
