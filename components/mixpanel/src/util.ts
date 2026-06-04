import { type Connection, ConnectionError } from "@prismatic-io/spectral";
import connections from "./connections";
import type { AuthorizationType } from "./types/AuthorizationType";

const validateDataType = (value) => {
  const type = typeof value;

  switch (type) {
    case "string":
      if (value === "" || value === null) {
        return false;
      }
      return true;
    case "number":
      if (value === "" || Number.isNaN(value)) {
        return false;
      }
      return true;
    case "boolean":
      if (value === "" || value === null) {
        return false;
      }
      return true;
    case "object":
      if (Array.isArray(value)) {
        return true; 
      }
      if (value !== null && Object.keys(value).length > 0) {
        return true; 
      }
      return false;
    default:
      return false;
  }
};

export const generatePayload = (data) => {
  const params = {};

  for (const [key, value] of Object.entries(data)) {
    if (validateDataType(value)) {
      params[key] = value;
    }
  }

  return params;
};

export const validateConnection = (connection: Connection): void => {
  const connectionKeys = connections.map((c) => c.key);
  if (!connectionKeys.includes(connection.key)) {
    throw new ConnectionError(
      connection,
      `Unsupported connection ${connection.key}.`,
    );
  }
};

export const generateBasicBase64Authorization = (toEncode: string): string => {
  const buffer = Buffer.from(toEncode);
  const bufferBase64 = buffer.toString("base64");
  return `Basic ${bufferBase64}`;
};

export const getProjectToken = (connection: Connection): string => {
  const { projectToken } = connection.fields;
  if (!projectToken) {
    throw new ConnectionError(
      connection,
      "Project token is required for this connection.",
    );
  }
  return generateBasicBase64Authorization(`${projectToken}:`);
};

export const getServiceAccountToken = (connection: Connection): string => {
  const { username, password } = connection.fields;
  if (!username && !password) {
    throw new ConnectionError(
      connection,
      "Username and password are required for this connection.",
    );
  }

  return generateBasicBase64Authorization(`${username}:${password}`);
};

export const getFallbackConnectionToken = (connection: Connection): string => {
  const { username, password, projectToken } = connection.fields;

  if (username && password) {
    return generateBasicBase64Authorization(`${username}:${password}`);
  }
  if (projectToken) {
    return generateBasicBase64Authorization(`${projectToken}:`);
  }
  throw new ConnectionError(
    connection,
    "Username and password or project token are required for this connection.",
  );
};

export const getAuthorization = (
  authorizationType: AuthorizationType,
  connection: Connection,
): string => {
  switch (authorizationType) {
    case "account":
      return getServiceAccountToken(connection);
    case "token":
      return getProjectToken(connection);
    case "fallback":
      return getFallbackConnectionToken(connection);
  }
};

export const jsonInputClean = (value: unknown) => {
  if (value !== null && value !== "") {
    return JSON.parse(value as string);
  }
  return undefined;
};

export const valueListInputClean = (value: unknown) => {
  if (Array.isArray(value) && value.length >= 1 && value[0] !== "000xxx") {
    return value as string[];
  }
  return undefined;
};
