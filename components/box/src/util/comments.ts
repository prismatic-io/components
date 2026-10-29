import type { BoxClient } from "box-node-sdk";
import { MAX_PAGE_SIZE } from "../constants";

export const getAllFileComments = async (
  client: BoxClient,
  fileId: string,
): Promise<Record<string, unknown>[]> => {
  const limit = MAX_PAGE_SIZE;
  let allEntries: Record<string, unknown>[] = [];
  let offset = 0;

  while (true) {
    const response = await client.comments.getFileComments(fileId, {
      queryParams: {
        fields: ["created_at", "id", "message"],
        offset,
        limit,
      },
    });

    const rawEntries =
      ((response.rawData as Record<string, unknown>)?.entries as Record<
        string,
        unknown
      >[]) ?? [];
    allEntries = allEntries.concat(rawEntries);

    if (rawEntries.length < limit) break;
    offset += rawEntries.length;
  }

  return allEntries;
};
