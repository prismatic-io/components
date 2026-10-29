import type { Connection } from "@prismatic-io/spectral";
import type { Credentials } from "../interfaces/Credentials";
import { toTrimmedString } from "./misc";

export const getCredentials = (connection: Connection): Credentials => {
  return {
    accessKeyId: toTrimmedString(connection.fields.accessKeyId),
    secretAccessKey: toTrimmedString(connection.fields.secretAccessKey),
  };
};
