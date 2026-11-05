import type { DataSourceResult } from "@prismatic-io/spectral";

const picklistResult: DataSourceResult<"picklist"> = {
  result: [
    { label: "Example 1", key: "example-1" },
    { label: "Example 2", key: "example-2" },
  ],
};

export const selectProjectExamplePayload: DataSourceResult<"picklist"> = picklistResult;
export const selectTaskExamplePayload: DataSourceResult<"picklist"> = picklistResult;
export const selectDraftTaskExamplePayload: DataSourceResult<"picklist"> = picklistResult;
export const selectProjectResourceExamplePayload: DataSourceResult<"picklist"> = picklistResult;
export const selectDraftProjectResourceExamplePayload: DataSourceResult<"picklist"> =
  picklistResult;
