import { type Connection, util } from "@prismatic-io/spectral";
export const getAuthorizationHeader = (connection: Connection): string => {
  const token = util.types.toString(connection.token.access_token);
  return `Bearer ${token}`;
};
