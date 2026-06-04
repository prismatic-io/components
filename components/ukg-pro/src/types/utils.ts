
export interface CachedToken {
  accessToken: string;
  expiresAt: number; 
}


export interface PicklistItem {
  label: string;
  key: string;
}


export interface PicklistMapConfig<T> {
  
  getLabel: (item: T) => string;
  
  getKey: (item: T) => string;
}





export interface PaginatedResponse<T> {
  data?: T[];
  items?: T[];
  results?: T[];
  employees?: T[];
  newHires?: T[];
  jobs?: T[];
  locations?: T[];
  positions?: T[];
  totalCount?: number;
  pageNumber?: number;
  pageSize?: number;
}




export interface FetchAllPagesOptions {
  
  params?: Record<string, unknown>;
  
  pageSize?: number;
  
  itemsKey?: string;
}
