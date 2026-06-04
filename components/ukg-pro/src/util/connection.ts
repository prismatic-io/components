import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import { createClient } from "@prismatic-io/spectral/dist/clients/http";
import connections, { ukgProBasicAuth } from "../connections";
import type { CachedToken } from "../types/utils";








const tokenCache: Record<string, CachedToken> = {};






export const validateConnection = (connection: Connection): void => {
  const validKeys = connections.map((c) => c.key);
  if (!validKeys.includes(connection.key)) {
    throw new ConnectionError(
      connection,
      `Unknown connection type: ${connection.key}. Expected one of: ${validKeys.join(", ")}`,
    );
  }
};




export const getBaseUrl = (connection: Connection): string => {
  const baseUrl = util.types.toString(connection.fields.baseUrl);
  
  return baseUrl.replace(/\/$/, "");
};





export const getTenantIdentifier = (connection: Connection): string => {
  
  
  
  
  
  
  return util.types.toString(connection.fields.tenantIdentifier);
};











export const getAuthHeaders = async (connection: Connection): Promise<Record<string, string>> => {
  switch (connection.key) {
    case ukgProBasicAuth.key: {
      const { username, password, customerApiKey } = connection.fields;
      const credentials = Buffer.from(
        `${util.types.toString(username)}:${util.types.toString(password)}`,
      ).toString("base64");
      return {
        Authorization: `Basic ${credentials}`,
        "US-Customer-Api-Key": util.types.toString(customerApiKey),
      };
    }

    
    
    
    
    
    

    default:
      throw new ConnectionError(connection, `Unsupported connection type: ${connection.key}`);
  }
};







export const getOAuthToken = async (connection: Connection): Promise<string> => {
  const clientId = util.types.toString(connection.fields.clientId);
  const clientSecret = util.types.toString(connection.fields.clientSecret);
  const tokenUrl = util.types.toString(connection.fields.tokenUrl);

  const cacheKey = `ukg-pro-oauth-${clientId}`;
  const now = Math.floor(Date.now() / 1000);

  
  const cached = tokenCache[cacheKey];
  if (cached && now < cached.expiresAt - 60) {
    return cached.accessToken;
  }

  
  const client = createClient({ baseUrl: tokenUrl });

  const params = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: clientId,
    client_secret: clientSecret,
  });

  const { data } = await client.post<{
    access_token: string;
    expires_in: number;
    token_type: string;
  }>(tokenUrl, params.toString(), {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  if (!data.access_token) {
    throw new ConnectionError(
      connection,
      "Failed to obtain access token from UKG Pro. Check your OAuth credentials.",
    );
  }

  
  tokenCache[cacheKey] = {
    accessToken: data.access_token,
    expiresAt: now + data.expires_in,
  };

  return data.access_token;
};




export const cleanString = (value: unknown): string | undefined =>
  value ? util.types.toString(value) : undefined;




export const cleanNumber = (value: unknown): number | undefined =>
  value ? util.types.toNumber(value) : undefined;
