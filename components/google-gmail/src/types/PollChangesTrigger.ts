import type { Connection } from "@prismatic-io/spectral";

export type PollChangesTriggerParams = {
  connection: Connection;
  userId: string;
  labelId: string | undefined;
  getMessageDetails: boolean;
};

export type PollChangesTriggerState = {
  historyId: string | undefined;
  lastPolledAt: string | undefined;
};
