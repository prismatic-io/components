export interface PollingState extends Record<string, unknown> {
  lastPolledAt?: string;
}
export interface AtomFeedEntry {
  id: string;
  feedName: string;
  updated: string;
  published: string;
  changedAttributes: string[];
  content: Record<string, unknown>;
}
export interface HcmAtomChangesObject {
  entries?: AtomFeedEntry[];
}
export interface HcmAtomRecordChange {
  changeType: "updated";
  record: AtomFeedEntry;
}
export interface HcmRestChangesObject {
  records?: Record<string, unknown>[];
  resourceType?: string;
}
export interface HcmRestRecordChange {
  changeType: "updated";
  record: Record<string, unknown>;
}
