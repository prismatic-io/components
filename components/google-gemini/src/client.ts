import { GoogleGenAI } from "@google/genai";
import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import { apiKeyConnection, vertexAIConnection } from "./connections";
import { getAuthToken, validateConnection } from "./util";

export const createGeminiClient = (connection: Connection): GoogleGenAI => {
  validateConnection(connection);

  if (connection.key === apiKeyConnection.key) {
    const apiKey = getAuthToken(connection);
    return new GoogleGenAI({
      apiKey,
    });
  }
  if (connection.key === vertexAIConnection.key) {
    const { projectId, region, clientEmail, privateKey } = connection.fields;
    if (!projectId || !region || !clientEmail || !privateKey) {
      throw new ConnectionError(
        connection,
        "Missing required fields for Vertex AI",
      );
    }
    const project = util.types.toString(projectId);
    const location = util.types.toString(region);
    const email = util.types.toString(clientEmail);
    const credentialsPrivateKey = util.types
      .toString(privateKey)
      .replace(/\\n/g, "\n");
    const client = new GoogleGenAI({
      vertexai: true,
      project,
      location,
      googleAuthOptions: {
        credentials: {
          client_email: email,
          private_key: credentialsPrivateKey,
        },
      },
    });
    return client;
  }
  throw new ConnectionError(connection, "Invalid connection");
};
