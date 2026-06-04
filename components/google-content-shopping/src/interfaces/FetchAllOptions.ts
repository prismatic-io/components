import type { content_v2_1 } from "googleapis";

export interface FetchAllOptions {
  client: content_v2_1.Content;
  merchantId: string;
  fetchAll: boolean;
  apiMethod: string;
  params: Record<string, unknown>;
}
