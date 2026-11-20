import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import { ConfidentialClientApplication } from "@azure/msal-node";
import { certificateCredentials } from "../connections";

export const getAccessToken = async (connection: Connection): Promise<string> => {
  if (connection.key === certificateCredentials.key) {
    const authority = `${connection.fields.entraIdEndpoint}/${connection.fields.tenant}`;
    const app = new ConfidentialClientApplication({
      auth: {
        clientId: util.types.toString(connection.fields.clientId),
        clientCertificate: {
          privateKey: util.types.toString(connection.fields.certificate).replace(/\\n/g, "\n"),
          thumbprint: util.types.toString(connection.fields.certificateThumbprint),
        },
        authority,
      },
    });
    const result = await app.acquireTokenByClientCredential({
      scopes: util.types
        .toString(connection.fields.scopes)
        .split(",")
        .map((s) => s.trim()),
    });
    if (!result?.accessToken) {
      throw new ConnectionError(connection, "Could not acquire access token with certificate.");
    }
    return result.accessToken;
  }
  const accessToken = util.types.toString(connection.token?.access_token);
  if (!accessToken) {
    throw new ConnectionError(connection, "Received a Connection without a valid access token.");
  }
  return accessToken;
};
