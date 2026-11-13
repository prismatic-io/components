export interface ItamMeta {
  total_count: number;
  page?: number;
  per_page?: number;
}

export interface ItamWriteResult {
  action: string;
  id: number | null;
  name: string;
  didSomethingChange: boolean;
  isNew: boolean;
  code: number | null;
  raw: unknown[];
}

export type ItamOperation =
  | "list"
  | "read"
  | "create"
  | "update"
  | "updateByName"
  | "delete";

export interface ItamDevice {
  device_id: number;
  name: string;
  serial_no?: string;
}

export interface ItamAsset {
  id: number;
  name: string;
  serial_no?: string;
  type?: string;
}
