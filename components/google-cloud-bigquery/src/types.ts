import type { createClient } from "./client";

export type BigQueryClient = ReturnType<typeof createClient>;

export interface PollingState extends Record<string, unknown> {
  lastPolledAt?: string;
  drainUntil?: number;
  highWater?: string;
}

export interface BigQueryJobRecord extends Record<string, unknown> {
  id?: string;
  jobReference?: {
    projectId?: string;
    jobId?: string;
    location?: string;
  };
  status?: { state?: string };
  statistics?: { creationTime?: string };
  user_email?: string;
}

export interface BigQueryChangesObject {
  created: BigQueryJobRecord[];
}

export interface BigQueryRecordChange {
  changeType: "created";
  record: BigQueryJobRecord;
}
