import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import { getOneDriveClient } from "./client";
import { oauth } from "./connections";

export const findGroup = async (groupId: string, connection: Connection) => {
  const client = getOneDriveClient(connection, false);
  const data = (await client.get("/groups")).data;

  const labelData = data?.value?.filter((item: Record<string, string>) => {
    return item?.name?.trim() === groupId?.trim();
  });

  if (labelData?.length === 1) {
    return labelData[0].id;
  }

  throw new Error(`Unable to find a group matching ${groupId}`);
};

export const getAuthHeaders = (connection: Connection) => {
  const token = util.types.toString(connection?.token?.access_token);
  return {
    Authorization: `Bearer ${token}`,
  };
};

export const validateConnection = (
  connection: Connection,
): connection is Connection => {
  if (connection.key !== oauth.key) {
    throw new ConnectionError(connection, "Unknown Connection type provided.");
  }
  return true;
};
