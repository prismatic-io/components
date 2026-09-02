export interface SearchResponse {
  total: number;
  results: Record<string, unknown>[];
  paging?: {
    next?: {
      after: string;
    };
  };
}
