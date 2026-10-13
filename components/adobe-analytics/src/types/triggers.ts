export interface PollingState extends Record<string, unknown> {
  knownIds?: string[];
}
export interface AdobeRecord {
  rsid?: string;
  globalCompanyId?: string;
  id?: string;
  [key: string]: unknown;
}
export interface AdobeChangesObject {
  created?: AdobeRecord[];
  updated?: AdobeRecord[];
}
export interface AdobeRecordChange {
  changeType: "created" | "updated";
  record: AdobeRecord;
}
