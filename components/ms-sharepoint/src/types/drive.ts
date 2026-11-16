import type { GraphCollectionResponse } from "./pagination";

export interface Drive {
  id: string;
  name: string;
}

export interface DriveItem {
  id: string;
  name: string;
  parentReference: {
    driveId: string;
    id: string;
    path: string;
  };
  folder?: {
    childCount: number;
  };
  file?: {
    mimeType: string;
  };
  size?: number;
  webUrl?: string;
  lastModifiedDateTime?: string;
  createdDateTime?: string;
  deleted?: { state: string };
}

export type DriveResponse = GraphCollectionResponse<DriveItem>;

export interface DriveDeltaResponse extends DriveResponse {
  "@odata.deltaLink": string;
}

export interface DriveDeltaPageResponse extends DriveResponse {
  "@odata.deltaLink"?: string;
}
