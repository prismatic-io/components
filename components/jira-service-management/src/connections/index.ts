import type { AtlassianConnectionKeys } from "atlassian-utils";
import { jsmBasic } from "./jsmBasic";
import { jsmOAuth2 } from "./jsmOAuth2";
import { jsmOpsGenieKey } from "./jsmOpsGenieKey";

export const CONNECTION_KEYS: AtlassianConnectionKeys = {
  oauth2: jsmOAuth2.key,
  basic: jsmBasic.key,
};





export const OPS_GENIE_KEY = jsmOpsGenieKey.key;

export default [jsmOAuth2, jsmBasic, jsmOpsGenieKey];
