import { input, util } from "@prismatic-io/spectral";
import { asStringArray, toOptionalString } from "../util";
import { connection } from "./common";
const scanTitle = input({
  label: "Scan Title",
  type: "string",
  required: true,
  comments: "A descriptive name to identify the scan in Qualys.",
  clean: util.types.toString,
  placeholder: "Enter scan title",
  example: "Weekly Vulnerability Scan",
});
const optionProfileId = input({
  label: "Option Profile ID",
  type: "string",
  required: true,
  comments:
    "ID of the scan option profile to use. Select from the Option Profile data source.",
  clean: util.types.toString,
  placeholder: "Select an option profile",
  example: "12345",
});
const scannerApplianceId = input({
  label: "Scanner Appliance",
  type: "string",
  required: false,
  comments:
    "Name or ID of the scanner appliance. Required when targets are not covered by Cloud Agent.",
  clean: toOptionalString,
  dataSource: "selectScannerAppliance",
  placeholder: "Select a scanner appliance",
});
const targetTagIds = input({
  label: "Target Tag IDs",
  type: "string",
  required: false,
  collection: "valuelist",
  comments: "Tag IDs identifying the assets to scan.",
  clean: asStringArray,
  placeholder: "Enter tag ID",
  example: "12345",
});
const assetGroupIds = input({
  label: "Asset Group IDs",
  type: "string",
  required: false,
  collection: "valuelist",
  comments: "Asset group IDs identifying the assets to scan.",
  clean: asStringArray,
  placeholder: "Enter asset group ID",
  example: "54321",
});
const scanRef = input({
  label: "Scan Reference",
  type: "string",
  required: false,
  comments: "Filter scans by reference ID (e.g., scan/1234567890.12345).",
  clean: toOptionalString,
  placeholder: "Enter scan reference",
  example: "scan/1234567890.12345",
});
const scanState = input({
  label: "Scan State",
  type: "string",
  required: false,
  comments:
    "Filter scans by execution state. Use Running to find active scans.",
  clean: toOptionalString,
  placeholder: "Select a scan state",
  example: "Running",
  model: [
    { label: "Running", value: "Running" },
    { label: "Finished", value: "Finished" },
    { label: "Canceled", value: "Canceled" },
    { label: "Paused", value: "Paused" },
    { label: "Error", value: "Error" },
  ],
});
const launchedAfter = input({
  label: "Launched After",
  type: "string",
  required: false,
  comments: "Filter scans launched after this date (YYYY-MM-DD).",
  clean: toOptionalString,
  placeholder: "2024-01-01",
  example: "2024-01-01",
});
export const launchScanInputs = {
  connection,
  scanTitle,
  optionProfileId,
  scannerApplianceId,
  targetTagIds,
  assetGroupIds,
};
export const listScansInputs = {
  connection,
  scanRef,
  scanState,
  launchedAfter,
};
