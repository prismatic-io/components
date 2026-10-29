interface RelayPageInfo {
  hasNextPage: boolean;
  endCursor: string | null;
}

export interface FluentOrder extends Record<string, unknown> {
  id?: string;
  ref?: string;
  type?: string;
  status?: string;
  createdOn?: string;
  updatedOn?: string;
}

export interface RelayOrdersResponse {
  orders: {
    edges: { node: FluentOrder }[];
    pageInfo: RelayPageInfo;
  };
}
