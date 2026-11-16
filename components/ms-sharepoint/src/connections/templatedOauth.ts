import { ConnectionKeys, getMicrosoftOAuth2AuthorizationCodeConnection } from "ms-utils";
import { DEFAULT_SCOPES } from "../constants";
import { source } from "./oauth";

export const templatedOauth = getMicrosoftOAuth2AuthorizationCodeConnection({
  key: ConnectionKeys.SharepointTemplatedOauth,
  defaultScopes: DEFAULT_SCOPES,
  additionalInputs: {
    source,
  },
});
