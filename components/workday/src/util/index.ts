import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import connections from "../connections";

export const cleanNumberInput = (value: unknown) =>
  value ? util.types.toNumber(value) : undefined;

export const cleanStringInput = (value: unknown) =>
  value ? util.types.toString(value) : undefined;

const throwCodeInputError = (inputLabel: string) => {
  throw new Error(`Invalid code for ${inputLabel} input.`);
};

export const cleanCodeInput = (value: unknown, inputLabel: string) => {
  if (value) {
    try {
      return util.types.toObject(value);
    } catch (_error) {
      throwCodeInputError(inputLabel);
    }
  }
  return undefined;
};

export const cleanArrayCodeInput = (value: unknown, inputLabel: string) => {
  if (value) {
    let object: unknown;
    try {
      object = util.types.toObject(value);
    } catch (_error) {
      throwCodeInputError(inputLabel);
    }
    if (Array.isArray(object)) {
      return object;
    }
    throw new Error(`Invalid array for ${inputLabel} input.`);
  }
  return undefined;
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

export const cleanDate = (value: unknown, inputLabel: string) => {
  if (value) {
    const date = new Date(util.types.toString(value));
    if (!Number.isNaN(date.getTime())) {
      return date;
    }
    throw new Error(`Invalid date for ${inputLabel} input.`);
  }
  return undefined;
};

export const getIdObject = (value: string | undefined) =>
  value
    ? {
        id: value,
      }
    : undefined;

export const cleanBooleanInput = (value: unknown) =>
  value ? util.types.toBool(value) : undefined;
