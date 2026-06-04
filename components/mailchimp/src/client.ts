import { createClient as createHttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import { mailchimpConnection, mailchimpOAuthConnection } from "./connections";

interface ParsedConnection {
  baseUrl: string;
  basicAuth: string;
}

export const parseConnection = async (
  connection: Connection,
): Promise<ParsedConnection> => {
  
  let dc: string, apiKey: string;

  
  if (connection.key === mailchimpConnection.key) {
    apiKey = util.types.toString(connection.fields.apiKey);
    const apiKeyRegex = /.+-.+/;
    if (!apiKeyRegex.test(apiKey)) {
      throw new ConnectionError(connection, "API Key is missing or invalid");
    }
    dc = apiKey.split("-")[1];
  }

  
  if (connection.key === mailchimpOAuthConnection.key) {
    apiKey = util.types.toString(connection.token.access_token);
    const client = createHttpClient({
      baseUrl: "https://login.mailchimp.com/oauth2/metadata",
    });
    const { data } = await client.get("", {
      headers: { Authorization: `OAuth ${apiKey}` },
    });
    dc = data.dc;
  }

  return Promise.resolve({
    baseUrl: `https://${dc}.api.mailchimp.com/3.0`,
    basicAuth: Buffer.from(`_:${apiKey}`).toString("base64"),
  });
};

export const createClient = async (connection: Connection, debug?: boolean) => {
  const { baseUrl, basicAuth } = await parseConnection(connection);
  const client = createHttpClient({
    baseUrl,
    headers: {
      Authorization: `Basic ${basicAuth}`,
      Accept: "application/json",
    },
    responseType: "json",
  });
  if (debug) {
    client.interceptors.response.use((response) => {
      console.log(response.data);
      return response;
    });
    client.interceptors.request.use((request) => {
      console.log(JSON.stringify(request));
      return request;
    });
  }

  return client;
};
