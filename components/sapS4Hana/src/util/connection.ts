import { type Connection, util } from "@prismatic-io/spectral";
import { sapApiKeyConnection, sapBasicAuthConnection, sapOAuthConnection } from "../connections";




export const getBaseUrl = (connection: Connection): string => {
  switch (connection.key) {
    case sapApiKeyConnection.key:
      
      return util.types.toString(connection.fields?.baseUrl);

    case sapBasicAuthConnection.key:
      
      return util.types.toString(connection.fields?.tenantUrl);

    case sapOAuthConnection.key: {
      
      const tenantId = util.types.toString(connection.fields?.tenantId);
      return `https://${tenantId}-api.s4hana.cloud.sap`;
    }

    default:
      
      return util.types.toString(connection.fields?.baseUrl || connection.fields?.tenantUrl);
  }
};




export const getAuthHeaders = (connection: Connection): Record<string, string> => {
  switch (connection.key) {
    case sapApiKeyConnection.key: {
      
      return {
        APIKey: util.types.toString(connection.fields?.apiKey),
      };
    }

    case sapBasicAuthConnection.key: {
      
      const username = util.types.toString(connection.fields?.username);
      const password = util.types.toString(connection.fields?.password);
      const credentials = Buffer.from(`${username}:${password}`).toString("base64");
      return {
        Authorization: `Basic ${credentials}`,
      };
    }

    case sapOAuthConnection.key: {
      
      const accessToken = util.types.toString(connection.token?.access_token);
      if (!accessToken) {
        throw new Error("OAuth access token not available. Please re-authenticate.");
      }
      return {
        Authorization: `Bearer ${accessToken}`,
      };
    }

    default: {
      
      if (connection.fields?.apiKey) {
        return {
          APIKey: util.types.toString(connection.fields.apiKey),
        };
      }
      
      if (connection.fields?.username && connection.fields?.password) {
        const username = util.types.toString(connection.fields.username);
        const password = util.types.toString(connection.fields.password);
        const credentials = Buffer.from(`${username}:${password}`).toString("base64");
        return {
          Authorization: `Basic ${credentials}`,
        };
      }
      
      if (connection.token?.access_token) {
        return {
          Authorization: `Bearer ${util.types.toString(connection.token.access_token)}`,
        };
      }
      throw new Error(`Unknown connection type: ${connection.key}`);
    }
  }
};




export const validateConnection = (connection: Connection): void => {
  switch (connection.key) {
    case sapApiKeyConnection.key: {
      if (!connection.fields?.apiKey) {
        throw new Error("API Key is required for SAP API Business Hub connection");
      }
      if (!connection.fields?.baseUrl) {
        throw new Error("Base URL is required for SAP API Business Hub connection");
      }
      break;
    }

    case sapBasicAuthConnection.key: {
      if (!connection.fields?.tenantUrl) {
        throw new Error("Tenant URL is required for Basic Auth connection");
      }
      if (!connection.fields?.username || !connection.fields?.password) {
        throw new Error("Username and password are required for Basic Auth connection");
      }
      break;
    }

    case sapOAuthConnection.key: {
      if (!connection.fields?.tenantId) {
        throw new Error("Tenant ID is required for OAuth connection");
      }
      
      break;
    }

    default:
      
      break;
  }
};
