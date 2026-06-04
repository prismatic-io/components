export interface ListActionResults {
  d: {
    results: Record<string, unknown>[] | Record<string, unknown>;
  };
}

export interface ActionResults {
  d: Record<string, unknown>;
}


export interface PollingState extends Record<string, unknown> {
  lastPolledAt?: string;
}





export interface SAPSuccessFactorsRecord {
  lastModifiedDateTime?: string;
  createdDateTime?: string;
  [key: string]: unknown;
}
