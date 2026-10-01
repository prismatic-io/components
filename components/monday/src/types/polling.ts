export interface PollingState extends Record<string, unknown> {
  lastPolledAt?: string;
}
export interface PollingRecordChange {
  changeType: "created" | "updated";
  record: MondayItem;
}
export interface PollingChangesObject {
  created?: MondayItem[];
  updated?: MondayItem[];
}
export interface MondayItem extends Record<string, unknown> {
  id: string;
  name?: string;
  created_at?: string;
  updated_at?: string;
  state?: string;
}
export interface ItemsPageResponse {
  boards?: Array<{
    items_page?: {
      cursor: string | null;
      items: MondayItem[];
    };
  }>;
}
export interface NextItemsPageResponse {
  next_items_page?: {
    cursor: string | null;
    items: MondayItem[];
  };
}
