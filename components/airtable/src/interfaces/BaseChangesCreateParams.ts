import type { Connection } from "@prismatic-io/spectral";

export interface BaseChangesCreateParams {
  airtableConnection: Connection;
  baseId: string;
  dataTypes: string[];
  recordChangeScope?: string;
}
