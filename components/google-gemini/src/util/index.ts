import type { GoogleGenAI } from "@google/genai";
import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import connections from "../connections";

export const validateConnection = (
  connection: Connection,
): connection is Connection => {
  if (!connections.map((c) => c.key).includes(connection.key)) {
    throw new ConnectionError(connection, "Invalid connection");
  }
  return true;
};

export const getAuthToken = (connection: Connection) => {
  const apiKey = util.types.toString(connection.fields?.apiKey);

  if (!apiKey) {
    throw new ConnectionError(connection, "API Key is required");
  }

  return apiKey;
};

export const cleanString = (value: unknown) =>
  value ? util.types.toString(value) : undefined;

export const cleanNumber = (value: unknown) =>
  value ? util.types.toNumber(value) : undefined;

export const cleanCode = (value: unknown) =>
  value ? util.types.toObject(value) : undefined;

export const cleanKeyValueList = (value: unknown) => {
  if (Array.isArray(value) && value.length > 0) {
    return util.types.keyValPairListToObject(value);
  }
  return {};
};

export const listModelsFN = async (
  client: GoogleGenAI,
  fetchAll: boolean,
  config: Record<string, unknown>,
) => {
  const listedModels = await client.models.list({
    config,
  });

  let modelArray = listedModels.page;
  const models = [];
  if (fetchAll) {
    while (fetchAll) {
      for (const model of modelArray) {
        models.push(model);
      }
      if (!listedModels.hasNextPage()) {
        break;
      }
      modelArray = await listedModels.nextPage();
    }
  } else {
    for (const model of modelArray) {
      models.push(model);
    }
  }
  return models;
};
