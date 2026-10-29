import type { Connection } from "@prismatic-io/spectral";
import { getOneDriveClient } from "../client";

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
