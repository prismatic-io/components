import { type Connection, util } from "@prismatic-io/spectral";
export const getBaseUrl = (connection: Connection): string => {
  const baseUrlField = util.types.toString(connection.fields.baseUrl);
  if (baseUrlField === "custom") {
    return util.types.toString(connection.fields.customBaseUrl);
  }
  return baseUrlField;
};
