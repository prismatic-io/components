export interface PaginatedResponse<T> {
  data: {
    data: T[];
    next_page: {
      offset: string;
      path: string;
      uri: string;
    } | null;
  };
}
