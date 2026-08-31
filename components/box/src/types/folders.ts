import type { BoxClient } from "box-node-sdk";
export interface GetFolderEntriesParams {
  client: BoxClient;
  id: string;
  marker?: string;
  limit?: number;
  offset?: number;
  fields?: string;
}
