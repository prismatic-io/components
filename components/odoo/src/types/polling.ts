import type { OdooRecord } from "./record";
export interface PollingState extends Record<string, unknown> {
  lastPolledAt?: string;
}
export interface PollResult {
  records: OdooRecord[];
  truncated: boolean;
}
