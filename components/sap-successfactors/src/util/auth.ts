import crypto from "node:crypto";
import { URLSearchParams } from "node:url";
import { promisify } from "node:util";
import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import { createClient as createHttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { Saml20, type SamlUnassignedOpts } from "saml";
import { apiKeyAuthentication, basicAuthentication } from "../connections";

export const validateConnection = (connection: Connection) => {
  if (
    ![basicAuthentication.key, apiKeyAuthentication.key].includes(
      connection.key,
    )
  ) {
    throw new Error(`Invalid connection key: ${connection.key}`);
  }
};

export const getAssert = (connection: Connection): SamlUnassignedOpts => {
  const cert = Buffer.from(util.types.toString(connection.fields.cert));
  const key = Buffer.from(util.types.toString(connection.fields.privateKey));
  const apiKey = connection.fields.apiKey;
  const server = connection.fields.apiServer;
  const user = connection.fields.user;
  const issuer = connection.fields.issuer;
  const audiences = connection.fields.audiences;
  const ttl = 3600;
  const options = {
    cert,
    key,
    issuer,
    lifetimeInSeconds: ttl,
    audiences,
    attributes: {
      api_key: apiKey,
      use_username: "true",
      external_user: "false",
    },
    nameIdentifier: user,
    sessionIndex: crypto.randomUUID(),
    recipient: `${server}/oauth/token`,
  } as SamlUnassignedOpts;
  return options;
};

export const createHashedAssertion = async (connection: Connection) => {
  const opts = getAssert(connection);

  const promise = promisify(Saml20.create);
  const assertion = await promise(opts);
  if (!assertion) {
    throw new ConnectionError(
      connection,
      "Failed to create SAML assertion. Verify that a valid certificate and private key are provided.",
    );
  }

  return Buffer.from(assertion).toString("base64");
};

export const fetchToken = async (connection: Connection, apiServer: string) => {
  const samlAssertion = await createHashedAssertion(connection);
  const companyId = util.types.toString(connection.fields.companyId);
  const apiKey = util.types.toString(connection.fields.apiKey);

  const params = new URLSearchParams();
  params.append("grant_type", "urn:ietf:params:oauth:grant-type:saml2-bearer");
  params.append("assertion", samlAssertion);
  params.append("company_id", companyId);
  params.append("client_id", apiKey);
  const tokenUrl = `${apiServer}oauth/token`;

  const client = createHttpClient({
    baseUrl: apiServer,
  });
  try {
    const { data } = await client.post(tokenUrl, params);
    return data.access_token;
  } catch (error) {
    const e = error as {
      message: string;
      response: { data: { errorMessage: string; errorHttpCode: string } };
    };
    if (e.response.data) {
      throw new Error(JSON.stringify(e.response.data));
    }
    throw e;
  }
};

export const getToken = async (
  connection: Connection,
  apiServer: string,
): Promise<string> => {
  validateConnection(connection);
  const { username, password, companyId } = connection.fields;

  switch (connection.key) {
    case apiKeyAuthentication.key:
      return await fetchToken(connection, apiServer);

    case basicAuthentication.key:
      return `${Buffer.from(`${username}@${companyId}:${password}`).toString("base64")}`;
    default:
      throw new Error(`Invalid connection key: ${connection.key}`);
  }
};

export const getBaseURL = (connection: Connection) => {
  const apiServer = connection.fields.apiServer;
  const environment =
    util.types.toString(apiServer) ||
    "https://sandbox.api.sap.com/successfactors";
  try {
    const baseURL = new URL(environment);
    if (!baseURL.protocol.includes("https")) {
      baseURL.protocol = "https:";
    }
    if (baseURL.pathname !== "") {
      baseURL.pathname = "/";
    }
    return baseURL.toString();
  } catch (_error) {
    throw new Error(`The API Server is not a valid URL: ${environment}`);
  }
};

export const getProtocol = (connection: Connection) => {
  const { protocol } = connection.fields;
  return protocol;
};
