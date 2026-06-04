import type { Connection } from "@prismatic-io/spectral";


export interface PollingState {
  
  lastPolledAt?: string;
}


export interface MsProjectRecord {
  Id?: string;
  Name?: string;
  CreatedDate?: string;
  LastPublishedDate?: string;
  [key: string]: unknown;
}



export interface MsProjectListResponse<T> {
  d?: {
    results?: T[];
  };
  value?: T[];
  results?: T[];
}

export interface CreateClientProps {
  connection: Connection;
}

export interface GetQueryString {
  queryString: string;
  url: string;
}
