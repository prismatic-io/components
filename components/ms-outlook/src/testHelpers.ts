import type { Connection } from "@prismatic-io/spectral";
import { oauth, oauthClientCredentials } from "./connections";

export const GRAPH_HOST = "https://graph.microsoft.com";

export const CLIENT_CREDENTIALS_USER_ID = "bb8775a4-4d8c-42cf-a1d4-4d58c2bb668f";

export const delegatedConnection = (): Connection => ({
  key: oauth.key,
  configVarKey: "Outlook Connection",
  fields: {},
  token: { access_token: "test-access-token" },
});

export const clientCredentialsConnection = (): Connection => ({
  key: oauthClientCredentials.key,
  configVarKey: "Outlook Connection",
  fields: { userId: CLIENT_CREDENTIALS_USER_ID },
  token: { access_token: "test-access-token" },
});
