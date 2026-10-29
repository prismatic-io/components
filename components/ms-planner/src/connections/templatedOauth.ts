import { getMicrosoftOAuth2AuthorizationCodeConnection } from "ms-utils";
import { SCOPES_FOR_AUTHORIZATION_CODE_FLOW } from "../constants";

export const templatedOauth = getMicrosoftOAuth2AuthorizationCodeConnection({
  key: "templatedOauth",
  defaultScopes: SCOPES_FOR_AUTHORIZATION_CODE_FLOW,
  comments: {
    scopes:
      "Space-separated Microsoft Graph scopes. Tasks.ReadWrite covers all Planner reads and writes and offline_access is required to receive a refresh token. Add Group.Read.All to list every group in the tenant rather than only the groups the signed-in user belongs to.",
  },
});
