import { type Connection, ConnectionError } from "@prismatic-io/spectral";
import { postmarkConnection as postmarkOAuth } from "./connections";
import { createClient } from "@prismatic-io/spectral/dist/clients/http";
import { BASE_URL } from "./constants";

interface CreateClientProps {
  postmarkConnection: Connection;
}

interface PostmarkClient {
  accountToken: string;
  serverToken: string;
}

const validateConnection = (
  connection: Connection,
): connection is Connection => {
  if (connection.key !== postmarkOAuth.key) {
    throw new ConnectionError(
      connection,
      `Unsupported authorization method ${connection.key}.`,
    );
  }
  return true;
};

export const getCredentials = ({
  postmarkConnection,
}: CreateClientProps): PostmarkClient | never => {
  validateConnection(postmarkConnection);
  const accountToken = postmarkConnection.fields.accountToken;
  const serverToken = postmarkConnection.fields.serverToken;

  if (typeof accountToken !== "string" || typeof serverToken !== "string") {
    throw new Error("accountToken and serverToken must be strings");
  }

  const client: PostmarkClient = {
    accountToken: accountToken,
    serverToken: serverToken,
  };

  return client;
};

export const createHttpClient = (
  connection: Connection,
  debug: boolean,
  useAccountToken = false,
) => {
  const { accountToken, serverToken } = getCredentials({
    postmarkConnection: connection,
  });
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  if (useAccountToken) {
    headers["X-Postmark-Account-Token"] = accountToken;
  } else {
    headers["X-Postmark-Server-Token"] = serverToken;
  }
  return createClient({
    baseUrl: BASE_URL,
    headers,
    debug,
  });
};
