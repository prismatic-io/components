import type { MessageInstance } from "twilio/lib/rest/api/v2010/account/message";
export interface PollingState extends Record<string, unknown> {
  lastPolledAt?: string;
  drainUntil?: string;
  highWater?: string;
  boundarySids?: string[];
  backfillActive?: boolean;
}
export type TwilioMessage = ReturnType<MessageInstance["toJSON"]>;
export interface TwilioChangesObject {
  created: TwilioMessage[];
  updated: TwilioMessage[];
}
export interface TwilioRecordChange {
  changeType: "created" | "updated";
  record: TwilioMessage;
}
