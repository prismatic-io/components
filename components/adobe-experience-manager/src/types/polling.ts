export interface PollWindowCursor extends Record<string, unknown> {
  windowStart: string;
  windowEnd: string;
  cursor: string;
}

export interface PollingState extends Record<string, unknown> {
  lastPolledAt?: string;
  cursor?: PollWindowCursor;
}

export interface PollWindow {
  windowStart: string;
  windowEnd: string;
  isInitialSync: boolean;
  cursor?: string;
}

export interface WindowPage<T> {
  records: T[];
  cursor?: string;
}
