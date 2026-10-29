import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";

export interface Data {
  data: unknown;
}

export interface CreateClientData {
  client: HttpClient;
  source: string;
}

export interface APIResponse<T> {
  value: T[];
  "@odata.nextLink"?: string;
}

export interface Column {
  id: string;
  name: string;
  index: number;
  values: string;
}

export interface Table {
  id: string;
  name: string;
  showHeaders: boolean;
  showTotals: boolean;
  style: string;
}

export interface DriveItem {
  id: string;
  name: string;
  file?: {
    mimeType: string;
  };
  folder?: {
    childCount: number;
  };
}

export interface Worksheet {
  id: string;
  position: number;
  name: string;
  visibility: string;
}

export interface Drive {
  id: string;
  name: string;
}

export interface Site {
  id: string;
  name: string;
}
