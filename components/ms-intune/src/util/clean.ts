import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import { msIntuneClientCredentials, msIntuneOAuth2 } from "../connections";
export const validateConnection = (connection: Connection): void => {
  if (
    ![msIntuneOAuth2.key, msIntuneClientCredentials.key].includes(
      connection.key,
    )
  ) {
    throw new ConnectionError(
      connection,
      `Unsupported connection method ${connection.key}.`,
    );
  }
};
export const cleanStringInput = (value: unknown): string | undefined =>
  value ? util.types.toString(value) : undefined;
export const cleanNumberInput = (value: unknown) =>
  value ? util.types.toNumber(value) : undefined;
export const cleanCodeInput = (value: unknown) =>
  value ? util.types.toObject(value) : undefined;
export const cleanBooleanStringInput = (value: unknown) => {
  if (value) {
    return util.types.toBool(value);
  }
  return undefined;
};
export const cleanBodyInput = (value: unknown) =>
  value ? util.types.toObject(value) : {};
export const cleanArrayInput = (value: unknown) => {
  if (value) {
    const data = util.types.toObject(value);
    if (Array.isArray(data)) {
      return data.map(cleanStringInput).filter(Boolean) as string[];
    }
  }
  throw new Error("Change Type must be an array.");
};
export const cleanOptionalArrayInput = (value: unknown) => {
  if (value) {
    const data = util.types.toObject(value);
    if (Array.isArray(data)) {
      return data.map(cleanStringInput).filter(Boolean) as string[];
    }
    throw new Error("Member IDs must be an array.");
  }
  return undefined;
};
