export interface EmployeeChange {
  id: string;
  action: "Inserted" | "Updated" | "Deleted";
  lastChanged: string;
}

export interface PollingState extends Record<string, unknown> {
  lastPolledAt?: string;
}

export interface BambooHRChangesObject {
  created: unknown[];
  updated: unknown[];
}

export interface BambooHRRecordChange {
  changeType: "created" | "updated";
  record: unknown;
}
