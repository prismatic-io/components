import { Connection, ConnectionError, util } from "@prismatic-io/spectral";
import { createClient } from "@prismatic-io/spectral/dist/clients/http";
import { docusignOauthConnection } from "./connections";
import { DEVELOPMENT_API_URL, LIVE_API_URL } from "./constants";

export const validateConnection = (connection: Connection) => {
  if (connection.key !== docusignOauthConnection.key) {
    throw new ConnectionError(connection, "DocuSign connection not found");
  }
};

export const getBaseUrl = async (
  connection: Connection,
  appendAccountId: boolean,
) => {
  const accountBaseUrl = util.types.toBool(connection.fields.useLiveEnvironment)
    ? LIVE_API_URL
    : DEVELOPMENT_API_URL;
  const client = createClient({ baseUrl: accountBaseUrl });
  const { data } = await client.get("/oauth/userinfo", {
    headers: { Authorization: `Bearer ${connection.token?.access_token}` },
  });

  return `${data.accounts[0].base_uri}/restapi/v2.1/accounts${
    appendAccountId ? `/${data.accounts[0].account_id}` : ""
  }`;
};

export const getDocuSignClient = async (
  connection: Connection,
  appendAccountId = true,
  debug = false,
) => {
  validateConnection(connection);
  const baseUrl = await getBaseUrl(connection, appendAccountId);
  return createClient({
    baseUrl,
    headers: {
      authorization: `Bearer ${connection.token?.access_token}`,
    },
    debug,
  });
};
