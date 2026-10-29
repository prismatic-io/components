export interface Envelope {
  envelope_id: string;
  envelope: string;
  status: string;
  created_at: string;
}

export interface PollingState extends Record<string, unknown> {
  lastPolledAt?: string;
}

export interface PollingRecordChange {
  changeType: "created";
  record: Envelope;
}

export interface PollingChangesObject {
  created?: Envelope[];
}
