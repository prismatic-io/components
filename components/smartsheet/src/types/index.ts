export interface Rows {
  columnId: string | number;
  value: unknown;
}

export interface SmartsheetWebhook {
  id: number;
  name: string;
  scope: string;
  scopeObjectId: number;
  events: string[];
  callbackUrl: string;
  sharedSecret: string;
  enabled: boolean;
  status: string;
  version: number;
  subscope: {
    columnIds: number[];
  };
  createdAt: string;
  modifiedAt: string;
}

export interface PollingState extends Record<string, unknown> {
  lastPolledAt?: string;
}

export interface SmartsheetSheet extends Record<string, unknown> {
  id: number;
  name: string;
  createdAt?: string;
  modifiedAt?: string;
}
