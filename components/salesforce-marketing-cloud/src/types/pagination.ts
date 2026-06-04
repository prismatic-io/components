



export type ItemsField = "items" | "definitions";
export type PreserveField = "requestId";


export interface PaginatedResponse {
  count: number;
  page: number;
  pageSize: number;
  items?: Record<string, unknown>[];
  definitions?: Record<string, unknown>[];
  requestId?: string;
  links?: Record<string, unknown>;
}


export interface PaginationOptions {
  



  itemsField?: ItemsField;
  


  preserveFields?: Array<PreserveField>;
}
