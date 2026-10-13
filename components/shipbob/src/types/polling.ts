export interface PollingState extends Record<string, unknown> {
  lastPolledAt?: string;
}
export interface ShipbobOrder extends Record<string, unknown> {
  id: number;
  created_date?: string;
}
export interface ShipbobOrderChanges {
  created: ShipbobOrder[];
  updated: ShipbobOrder[];
}
export interface ShipbobOrderChange {
  changeType: "created" | "updated";
  record: ShipbobOrder;
}
export interface PollWindow {
  since: string;
  createdAfter: string;
  includeNew: boolean;
  includeUpdated: boolean;
}
