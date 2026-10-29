interface Pagination {
  start: number | null;
  limit: number;
  more_items_in_collection: boolean;
  next_start: number | null;
}

export interface AdditionalData {
  pagination: Pagination;
}

interface AdditionalCursorData {
  next_cursor: string | null;
}

export interface GenericPaginationData<T> {
  data: T[];
  additional_data: AdditionalData;
}

export interface GenericCursorPaginationData<T> {
  data: T[];
  additional_data: AdditionalCursorData;
}
