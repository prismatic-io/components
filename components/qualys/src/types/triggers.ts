import type { QualysAsset } from "./assets";
export interface PollingState {
  lastPolledAt?: string;
}
export interface ChangedAssetsChangesObject {
  createdRecords: QualysAsset[];
  updatedRecords: QualysAsset[];
}
export interface ChangedAssetItem {
  changeType: "created" | "updated";
  asset: QualysAsset;
}
export interface ChangedAssetsVisibility {
  showNewRecords: boolean;
  showUpdatedRecords: boolean;
}
