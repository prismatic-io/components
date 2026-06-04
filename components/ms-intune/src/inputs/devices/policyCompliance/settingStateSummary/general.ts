import { input, util } from "@prismatic-io/spectral";

export const deviceCompliancePolicySettingStateSummaryId = input({
  label: "Device Compliance Policy Setting State Summary Id",
  example: "705c034c-034c-705c-4c03-5c704c035c70",
  placeholder: "Enter setting state summary ID",
  comments:
    "Unique Identifier for the device compliance policy setting state summary to retrieve.",
  type: "string",
  required: true,
  clean: util.types.toString,
  dataSource: "selectDeviceCompliancePolicySettingStateSummary",
});
