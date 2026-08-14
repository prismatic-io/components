export type ItemsField = "items" | "definitions";
export type PreserveField = "requestId";
export interface PaginatedResponse<T = Record<string, unknown>> {
  count: number;
  page: number;
  pageSize: number;
  items?: T[];
  definitions?: T[];
  requestId?: string;
  links?: Record<string, unknown>;
}
export interface PaginationOptions {
  itemsField?: ItemsField;
  preserveFields?: Array<PreserveField>;
}
