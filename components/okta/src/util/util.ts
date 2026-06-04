import { URLSearchParams } from "node:url";
import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import { createClient, type HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import jwt from "jsonwebtoken";
import connections, {
  oktaApiTokenConnection,
  oktaClientCredentialsOrg,
  oktaOAuth2AuthorizationCode,
} from "../connections";
import type { GlobalCache } from "../interfaces/general";

export const validateConnection = (connection: Connection) => {
  if (!connections.map((c) => c.key).includes(connection.key)) {
    throw new Error(`Connection with key ${connection.key} not found.`);
  }
};

export const getBaseUrl = (connection: Connection): string => {
  const baseUrl = util.types.toString(connection.fields.oktaDomainUrl);
  const normalizedUrl = baseUrl.replace(/\/$/, "");
  return normalizedUrl.startsWith("https://") ? normalizedUrl : `https://${normalizedUrl}`;
};

export const getToken = async (connection: Connection): Promise<string> => {
  let token: string | undefined;
  switch (connection.key) {
    case oktaApiTokenConnection.key:
      token = `SSWS ${util.types.toString(connection.fields.apiToken)}`;
      break;
    case oktaOAuth2AuthorizationCode.key:
      token = `Bearer ${util.types.toString(connection.token?.access_token)}`;
      break;
    case oktaClientCredentialsOrg.key: {
      const clientCredentialsToken = await getOktaOrgAccessToken(connection);
      token = `Bearer ${clientCredentialsToken}`;
      break;
    }
    default:
      throw new ConnectionError(connection, `Unsupported connection type: ${connection.key}`);
  }
  if (!token) {
    throw new ConnectionError(connection, "Authentication token is missing or invalid.");
  }
  return token;
};

const getNextLink = (linkHeader: string): string | undefined => {
  const links = linkHeader.split(",").map((part) => part.trim());
  const nextLink = links.find((link) => link.includes('rel="next"'));
  if (!nextLink) return undefined;
  const url = new URLSearchParams(nextLink.split(";")[0].replace(/<(.*)>/, "$1"));
  return url.get("after") || undefined;
};

export const paginateRecordsWithLink = async <T>(
  client: HttpClient,
  url: string,
  fetchAll: boolean,
  params: Record<string, unknown>,
) => {
  const { data, headers } = await client.get<T[]>(url, { params });
  if (fetchAll) {
    let allData: T[] = Array.isArray(data) ? data : [];
    let nextLink = getNextLink(headers.link || "");
    while (nextLink) {
      const { data: nextData, headers: nextHeaders } = await client.get<T[]>(url, {
        params: { ...params, after: nextLink },
      });
      if (Array.isArray(nextData)) {
        allData = allData.concat(nextData);
      }
      nextLink = getNextLink(nextHeaders.link || "");
      if (nextData.length === 0) break;
    }
    return allData;
  }
  return data;
};

export const cleanStringArray = (arr: unknown): string[] => {
  if (!Array.isArray(arr)) return [];
  return arr.map((item) => util.types.toString(item).trim()).filter(Boolean);
};

export const generateJwtAssertion = (
  clientId: string,
  privateKey: string,
  oktaDomain: string,
  now: number,
): string => {
  const payload = {
    iss: clientId,
    sub: clientId,
    aud: `https://${oktaDomain}/oauth2/v1/token`,
    exp: now + 3600,
    iat: now,
  };

  return jwt.sign(payload, privateKey, { algorithm: "RS256" });
};

export const getOktaOrgAccessToken = async (connection: Connection): Promise<string> => {
  const oktaDomain = cleanOktaDomain(util.types.toString(connection.fields.oktaDomainUrl));
  const clientId = util.types.toString(connection.fields.clientId);
  const privateKey = util.types.toString(connection.fields.privateKey).replace(/\\n/g, "\n");
  const scopes = util.types.toString(connection.fields.scopes);

  const cacheKey = `Okta-Org-${clientId}`;
  const global = globalThis as Record<string, unknown>;

  
  const cachedToken = global[cacheKey] as GlobalCache;
  const now = Math.floor(Date.now() / 1000);

  if (cachedToken && now < cachedToken.expiresDate) {
    return cachedToken.accessToken;
  }

  const jwtAssertion = generateJwtAssertion(clientId, privateKey, oktaDomain, now);

  const tokenUrl = `https://${oktaDomain}/oauth2/v1/token`;
  const params = new URLSearchParams({
    grant_type: "client_credentials",
    scope: scopes,
    client_assertion_type: "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
    client_assertion: jwtAssertion,
  });

  const client = createClient({
    baseUrl: tokenUrl,
  });

  const { data } = await client.post(tokenUrl, params.toString(), {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  if (!data.access_token) {
    throw new ConnectionError(connection, "Failed to obtain access token from Okta.");
  }

  const expiresIn = data.expires_in;
  const expiresDate = now + expiresIn - 60; 

  global[cacheKey] = {
    accessToken: data.access_token,
    expiresDate,
  };

  return data.access_token;
};

const cleanOktaDomain = (domain: string): string => {
  return domain.replace(/^https?:\/\//, "").replace(/\/$/, "");
};
