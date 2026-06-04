import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import { createClient as createHttpClient } from "@prismatic-io/spectral/dist/clients/http";
import * as jwt from "jsonwebtoken";
import UID from "uid-safe";
import { apiKey, oauth } from "./connections";

const validateApiKeyConnection = (connection: Connection) => {
  if (!connection.fields.apiKey || !connection.fields.tenant) {
    throw new ConnectionError(
      connection,
      "Received valid Connection type but did not find valid api key or account name.",
    );
  }
  return {
    headers: {
      Authorization: `Bearer ${util.types.toString(connection.fields.apiKey)}`,
    },
    tenant: util.types.toString(connection.fields.tenant),
  };
};

const accountRegex = /https:\/\/(.*)\.us.qlikcloud.com\//;

const validateOAuthConnection = (connection: Connection) => {
  if (
    !connection.fields.authorizeUrl ||
    !connection.fields.tokenUrl ||
    !connection.fields.scopes ||
    !connection.fields.clientId ||
    !connection.fields.clientSecret ||
    !connection.token?.access_token
  ) {
    throw new ConnectionError(
      connection,
      "Received valid Connection type but did not find valid authorizeUrl, tokenUrl, scopes, clientId, clientSecret or access token.",
    );
  }
  const tokenUrl = util.types.toString(connection.fields.tokenUrl);
  const accountMatch = accountRegex.exec(tokenUrl);
  if (!accountMatch?.[1]) {
    throw new Error(
      "Unable to extract account ID. Token URL needs to be of the form https://<your-tenant>.us.qlikcloud.com/oauth/authorize",
    );
  }
  const tenant = accountMatch[1];
  return {
    headers: {
      Authorization: `Bearer ${util.types.toString(
        connection.token?.access_token,
      )}`,
    },
    tenant,
  };
};

const _validateJsonWebTokenConnection = (connection: Connection) => {
  if (
    !connection.fields.clientEmail ||
    !connection.fields.privateKey ||
    !connection.fields.tenant ||
    !connection.fields.issuer ||
    !connection.fields.keyId
  ) {
    throw new ConnectionError(
      connection,
      "Received valid Connection type but did not find valid clientEmail, privateKey, tenant, issuer or keyId",
    );
  }
  const tenant = util.types.toString(connection.fields.tenant);
  const privateKey = util.types
    .toString(connection.fields.privateKey)
    .replace(/\\n/g, "\n");
  const kid = util.types.toString(connection.fields.keyId);
  const iss = util.types.toString(connection.fields.issuer);
  const email = util.types.toString(connection.fields.clientEmail);
  const payload = {
    jti: UID.sync(32), 
    sub: "0h34s4yfnMBdtOzza2UZeoso4G24p-7R6eeGdZUQHF0-c",
    subType: "user",
    name: "Acme",
    email,
    email_verified: true,
    groups: ["Administrators", "Sales", "Marketing"],
  };
  const signingOptions = {
    kid,
    alg: "RS256",
    iss,
    exp: "10m",
    nbf: "1s",
    aud: "qlik.api/login/jwt-session",
  };
  const jwtToken = jwt.sign(payload, privateKey, {
    header: signingOptions,
  });
  console.log("jwtToken", jwtToken);
  return {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
    tenant,
  };
};

export const validateConnection = (connection: Connection) => {
  if (
    connection.key !== apiKey.key &&
    connection.key !== oauth.key
    
  ) {
    throw new ConnectionError(connection, "Unknown Connection type provided.");
  }

  switch (connection.key) {
    case apiKey.key:
      return validateApiKeyConnection(connection);
    case oauth.key:
      return validateOAuthConnection(connection);
    
    
  }

  throw new ConnectionError(
    connection,
    "Received valid Connection type but did not find valid api key or account name.",
  );
};

export const createClient = (connection: Connection, debug: boolean) => {
  const { headers, tenant } = validateConnection(connection);
  const baseUrl = `https://${tenant}.us.qlikcloud.com/api/v1`;

  const client = createHttpClient({
    baseUrl,
    headers: { ...headers, "Content-Type": "application/json" },
    debug,
  });
  return client;
};
