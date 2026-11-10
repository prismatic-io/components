import { getMicrosoftOAuth2AuthorizationCodeConnection } from "ms-utils";
import { scopesForAuthorizationCodeFlow } from "../constants";

export const templatedOauth = getMicrosoftOAuth2AuthorizationCodeConnection({
  key: "templatedOauth",
  defaultScopes: scopesForAuthorizationCodeFlow,
});
