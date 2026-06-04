import type { MessageInstance } from "twilio/lib/rest/api/v2010/account/message";

export interface PollingState extends Record<string, unknown> {
  lastPolledAt?: string;
}

export type TwilioMessage = ReturnType<MessageInstance["toJSON"]>;
