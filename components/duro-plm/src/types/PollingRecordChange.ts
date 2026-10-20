import type { DuroRecord } from "./DuroRecord";
export interface PollingRecordChange {
  changeType: "created" | "updated";
  record: DuroRecord;
}
