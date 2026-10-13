export interface PollingState extends Record<string, unknown> {
  lastPolledAt?: string;
}
export interface BigCommerceChangesObject {
  created?: BigCommerceOrder[];
  updated?: BigCommerceOrder[];
}
export interface BigCommerceRecordChange {
  changeType: "created" | "updated";
  record: BigCommerceOrder;
}
export interface BigCommerceOrder {
  id: number;
  date_created?: string;
  date_modified?: string;
  status?: string;
  status_id?: number;
  [key: string]: unknown;
}
