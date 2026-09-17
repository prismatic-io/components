import type { PaginationMetadata } from "./pagination";
export interface SendGridWebhook {
  id: string;
  friendly_name?: string;
  url?: string;
  enabled?: boolean;
}
interface SendGridList {
  id: string;
  name: string;
  contact_count: number;
  _metadata: {
    self: string;
  };
}
export interface GetAllListsResponseBody {
  result: SendGridList[];
  _metadata?: PaginationMetadata;
}
