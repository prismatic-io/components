export interface PollingState extends Record<string, unknown> {
  lastPolledAt?: string;
}

export interface FluentOrder extends Record<string, unknown> {
  id?: string;
  ref?: string;
  type?: string;
  status?: string;
  createdOn?: string;
  updatedOn?: string;
}

export interface RelayPageInfo {
  hasNextPage: boolean;
  endCursor: string | null;
}

export interface RelayOrdersResponse {
  orders: {
    edges: { node: FluentOrder }[];
    pageInfo: RelayPageInfo;
  };
}
