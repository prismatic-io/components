export interface PollingTriggerObject {
  CreatedDate: string;
  LastModifiedDate: string;
  [key: string]: unknown;
}
export interface DeletedRecord {
  id: string;
  deletedDate: string;
  IsDeleted: true;
}
export interface PollingCursor extends Record<string, unknown> {
  watermark: string;
  windowStart: string;
  windowEnd: string;
  isBackfill: boolean;
  lastId?: string;
}
export interface PollingState extends Record<string, unknown> {
  lastPolledAt?: string;
  cursor?: PollingCursor;
  lastDeletedAt?: string;
}
export interface SalesforceChangesObject {
  createdRecords: PollingTriggerObject[];
  updatedRecords: PollingTriggerObject[];
  deletedRecords: DeletedRecord[];
}
export type SalesforceRecordChange =
  | {
      changeType: "created" | "updated";
      record: PollingTriggerObject;
    }
  | {
      changeType: "deleted";
      record: DeletedRecord;
    };
export interface PollingLogger {
  warn: (message: string) => void;
}
export interface PollingFieldLogger extends PollingLogger {
  debug: (message: string) => void;
}
export interface AdvanceResult {
  emit: PollingTriggerObject[];
  nextCursor: PollingCursor | null;
}
export interface FetchPollingPageParams {
  recordType: string;
  fields: string[];
  filters: Record<string, unknown>;
  cursor: PollingCursor;
  pageSize: number;
}
export interface ResolveCursorParams {
  incoming: PollingCursor | undefined;
  state: PollingState;
  lookBackDate: string;
  now: string;
}
