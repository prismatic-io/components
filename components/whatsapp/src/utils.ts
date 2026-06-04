import { Connection, ConnectionError, util } from "@prismatic-io/spectral";
import connections from "./connections";

export const validateConnection = (connection: Connection): void => {
  const connectionKeys = connections.map((c) => c.key);
  if (!connectionKeys.includes(connection.key)) {
    throw new ConnectionError(
      connection,
      `Unsupported connection ${connection.key}.`,
    );
  }
};

export const cleanStringInput = (value: unknown) =>
  value ? util.types.toString(value) : undefined;

const throwCodeInputError = (inputLabel: string) => {
  throw new Error(`Invalid code for ${inputLabel} input.`);
};

export const cleanCodeInput = (value: unknown, inputLabel: string) => {
  if (value) {
    try {
      const object = util.types.toObject(value);
      if (typeof object === "string") {
        JSON.parse(object);
      }
      return util.types.toObject(value);
    } catch (error) {
      throwCodeInputError(inputLabel);
    }
  }
  return undefined;
};

export const cleanArrayCodeInput = (value: unknown, inputLabel: string) => {
  if (value) {
    let object;
    try {
      object = util.types.toObject(value);
    } catch (error) {
      throwCodeInputError(inputLabel);
    }
    if (Array.isArray(object)) {
      return object;
    }
    throw new Error(`Invalid array for ${inputLabel} input.`);
  }
  return undefined;
};
