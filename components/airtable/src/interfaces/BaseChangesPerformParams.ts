import type { Connection } from "@prismatic-io/spectral";

export interface BaseChangesPerformParams {
  airtableConnection: Connection;
  baseId: string;
}
