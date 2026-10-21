export interface PollingState extends Record<string, unknown> {
  lastPolledAt?: string;
  after?: string | null;
  backfillActive?: boolean;
}
export interface PollingCursor extends Record<string, unknown> {
  after: string;
}
export interface FluentOrder extends Record<string, unknown> {
  id?: string;
  ref?: string;
  type?: string;
  status?: string;
  createdOn?: string;
  updatedOn?: string;
}
export interface FluentCommerceChangesObject {
  created?: FluentOrder[];
  updated?: FluentOrder[];
}
export interface FluentCommerceRecordChange {
  changeType: "created" | "updated";
  record: FluentOrder;
}
export interface RelayPageInfo {
  hasNextPage: boolean;
  endCursor: string | null;
}
export interface RelayOrdersResponse {
  orders: {
    edges: {
      node: FluentOrder;
    }[];
    pageInfo: RelayPageInfo;
  };
}
