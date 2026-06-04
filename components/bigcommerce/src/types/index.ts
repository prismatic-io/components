
export interface PollingState extends Record<string, unknown> {
  lastPolledAt?: string; 
}







export interface BigCommerceOrder {
  id: number;
  date_created?: string;
  date_modified?: string;
  status?: string;
  status_id?: number;
  [key: string]: unknown;
}
