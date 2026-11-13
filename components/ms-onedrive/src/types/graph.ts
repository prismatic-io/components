export interface GraphListResponse<T> {
  value: T[];
  "@odata.context"?: string;
}

export interface GraphPageResponse<T> {
  value?: T[];
  "@odata.nextLink"?: string;
}

export interface Drive {
  id: string;
  name?: string;
}

export interface DriveItem {
  id: string;
  name?: string;
  folder?: Record<string, unknown>;
}

export interface Site {
  id: string;
  displayName?: string;
}
