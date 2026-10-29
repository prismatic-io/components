export interface Lead {
  id: number;
  displayName: string;
  dataType: string;
  length: number;
  rest: {
    name: string;
    readOnly: boolean;
  };
  soap: {
    name: string;
    readOnly: boolean;
  };
}

export interface Company {
  seq: number;
  id: number;
  externalCompanyId: string;
  company: string;
}

export interface PaginatedResponse<T> {
  requestId: string;
  success: boolean;
  nextPageToken?: string;
  result: T[];
}
