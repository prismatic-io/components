export interface BaseChangesState {
  webhookId: string;
  baseId: string;
  dataTypes: string[];
  recordChangeScope?: string;
  macSecret: string;
  expirationTime: string;
  cursor?: number;
}
