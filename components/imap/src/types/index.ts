export interface ImapPollingState {
  lastUidNext?: number;
  uidValidity?: string;
  lastPolledAt?: string;
}


export interface ImapStatusResult {
  path: string;
  messages?: number;
  recent?: number;
  uidNext?: number;
  uidValidity?: bigint;
  unseen?: number;
  highestModseq?: bigint;
}
