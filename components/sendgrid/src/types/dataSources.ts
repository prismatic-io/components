export interface SendGridWebhook {
  id: string;
  friendly_name?: string;
  url?: string;
  enabled?: boolean;
}
export interface SendGridList {
  id: string;
  name: string;
  contact_count: number;
  _metadata: {
    self: string;
  };
}
export interface GetAllListsResponseBody {
  result: SendGridList[];
  _metadata?: {
    self: string;
    next?: string;
    prev?: string;
    count?: number;
  };
}
