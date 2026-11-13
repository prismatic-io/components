export interface PaginationGroup {
  pageLimit?: number;
  pageToken?: string;
}

export interface PaginationParams {
  pagination?: PaginationGroup;
}

export interface ResolvedPagination {
  pageSize?: number;
  pageToken?: string;
}

export interface QueryParameterGroup {
  $select?: string;
  $expand?: string;
  $top?: number;
}

export interface QueryParameterParams {
  queryParameters?: QueryParameterGroup;
}

export interface ParentRef {
  id: string;
  label?: string;
}
