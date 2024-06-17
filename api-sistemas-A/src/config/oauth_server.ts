import OauthModel from "../models/OauthModel";
import OAuth2Server from "oauth2-server";

const oauth = new OAuth2Server({
  model: OauthModel,
  accessTokenLifetime: 3600,
  allowBearerTokensInQueryString: true,
});

export default oauth;
