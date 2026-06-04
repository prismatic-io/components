import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import { basicConnection, confluenceOauth } from "./connections";
import { createClient as createHttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { GraphQLClient } from "graphql-request";
import axios from "axios";
import type { AccessibleResource } from "./interfaces";

export const buildAuthHeaders = (
  connection: Connection,
): Record<string, string> => {
  switch (connection.key) {
    case basicConnection.key: {
      const token = Buffer.from(
        `${connection.fields.email}:${connection.fields.apiToken}`,
      ).toString("base64");
      return { Authorization: `Basic ${token}` };
    }
    case confluenceOauth.key: {
      return { Authorization: `Bearer ${connection.token.access_token}` };
    }
    default: {
      throw new ConnectionError(
        connection,
        "The Connection you provided is not supported for this component",
      );
    }
  }
};

const searchOverridenHostId = (
  accessibleResources: AccessibleResource[],
  searchTerm: string,
): string => {
  const matchingResource = accessibleResources.find(
    (resource) => resource.name === searchTerm || resource.url === searchTerm,
  );
  if (matchingResource) return matchingResource.id;
  throw new Error(`No matching resource found for ${searchTerm}`);
};

export const getHost = async (connection: Connection): Promise<string> => {
  try {
    const { data: accessibleResources } = await axios.get<AccessibleResource[]>(
      "https://api.atlassian.com/oauth/token/accessible-resources",
      {
        headers: {
          ...buildAuthHeaders(connection),
        },
      },
    );

    const apiSiteOverride = connection.fields.apiSiteOverride;
    const id = apiSiteOverride
      ? searchOverridenHostId(accessibleResources, apiSiteOverride as string)
      : accessibleResources[0].id;

    return `api.atlassian.com/ex/confluence/${id}`;
  } catch (error) {
    throw new Error(`Failed to retrieve accessible resources. ${error}`);
  }
};

const validateConnection = (connection: Connection): void => {
  if (
    ![confluenceOauth.key].includes(connection.key) &&
    ![basicConnection.key].includes(connection.key)
  ) {
    throw new ConnectionError(
      connection,
      "The Connection you provided is not supported for this component",
    );
  }
};

export const getBaseUrl = async (connection: Connection): Promise<string> => {
  switch (connection.key) {
    case confluenceOauth.key: {
      const host = await getHost(connection);
      return `https://${host}/wiki/api/v2`;
    }
    case basicConnection.key: {
      return `https://${connection.fields.host}/wiki/api/v2`;
    }
  }
};

export const getGraphBaseUrl = (connection: Connection): string => {
  switch (connection.key) {
    case confluenceOauth.key: {
      return "https://api.atlassian.com/graphql";
    }
    case basicConnection.key: {
      return `https://${connection.fields.host}/gateway/api/graphql`;
    }
  }
};

const getClient = (connection: Connection, baseUrl: string, debug = false) =>
  createHttpClient({
    baseUrl,
    debug,
    headers: {
      ...buildAuthHeaders(connection),
      Accept: "application/json",
    },
    responseType: "json",
  });

export const createClient = async (connection: Connection, debug = false) => {
  validateConnection(connection);
  const baseUrl = await getBaseUrl(connection);
  return getClient(connection, baseUrl, debug);
};

export const createGraphClient = (connection: Connection, debug = false) => {
  validateConnection(connection);
  const headers = buildAuthHeaders(connection);
  const baseURL = getGraphBaseUrl(connection);
  try {
    const client = new GraphQLClient(baseURL, {
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      requestMiddleware: (request) => {
        if (debug) {
          console.log({ request: JSON.stringify(request) });
        }
        return request;
      },
      responseMiddleware: (response) => {
        if (debug) {
          console.log({ response: JSON.stringify(response) });
        }
      },
    });
    return client;
  } catch (error) {
    console.log(error);
  }
};

export const getHostBasedOnConnection = async (connection: Connection) => {
  let baseUrl: string;
  switch (connection.key) {
    case confluenceOauth.key: {
      baseUrl = `https://${await getHost(connection)}`;
      break;
    }
    case basicConnection.key: {
      baseUrl = `https://${util.types.toString(connection.fields.host)}`;
      break;
    }
    default: {
      throw new ConnectionError(connection, "Unsupported connection type");
    }
  }

  return baseUrl;
};
