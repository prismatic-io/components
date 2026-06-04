export interface PollingState {
  knownIds?: string[];
}

export interface AdobeRecord {
  rsid?: string;
  globalCompanyId?: string;
  id?: string;
  [key: string]: unknown;
}
