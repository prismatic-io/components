export interface PollingState extends Record<string, unknown> {
  lastPolledAt?: string;
}

export interface StripeEvent extends Record<string, unknown> {
  id?: string;
  object?: string;
  type?: string;
  created?: number;
  data?: { object?: unknown };
}

export interface StripeChangesObject {
  created?: StripeEvent[];
  updated?: StripeEvent[];
}

export interface StripeRecordChange {
  changeType: "created" | "updated";
  record: StripeEvent;
}
