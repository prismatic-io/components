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
