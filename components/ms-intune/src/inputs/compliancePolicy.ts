import { input, util } from "@prismatic-io/spectral";
import { connection } from "./common";
const deviceCompliancePolicyId = input({
  label: "Device Compliance Policy ID",
  example: "705c034c-034c-705c-4c03-5c704c035c70",
  placeholder: "Enter device compliance policy ID",
  comments: "Unique Identifier for the device compliance policy to retrieve.",
  type: "string",
  required: true,
  clean: util.types.toString,
  dataSource: "selectDeviceCompliancePolicy",
});
const assignId = input({
  label: "Assignment ID",
  example: "705c034c-034c-705c-4c03-5c704c035c70",
  placeholder: "Enter assignment ID",
  comments: "The unique identifier for the policy assignment.",
  type: "string",
  required: true,
  clean: util.types.toString,
});
const target = input({
  label: "Target",
  type: "string",
  comments:
    "The device compliance policy assignment target type (e.g., configurationManagerCollectionAssignmentTarget, groupAssignmentTarget).",
  required: true,
  example: "microsoft.graph.configurationManagerCollectionAssignmentTarget",
  placeholder: "Enter target type",
  clean: util.types.toString,
});
const collectionId = input({
  label: "Collection ID",
  example: "705c034c-034c-705c-4c03-5c704c035c70",
  placeholder: "Enter collection ID",
  comments:
    "The unique identifier for the Configuration Manager target collection.",
  type: "string",
  required: true,
  clean: util.types.toString,
});
export const assignDeviceCompliancePolicyInputs = {
  connection,
  deviceCompliancePolicyId: {
    ...deviceCompliancePolicyId,
    comments:
      "Unique Identifier for the device to assign the compliance policy.",
  },
  assignId,
  target,
  collectionId,
};
export const getDeviceCompliancePolicyInputs = {
  connection,
  deviceCompliancePolicyId,
};
const deviceCompliancePolicySettingStateSummaryId = input({
  label: "Device Compliance Policy Setting State Summary ID",
  example: "705c034c-034c-705c-4c03-5c704c035c70",
  placeholder: "Enter setting state summary ID",
  comments:
    "Unique Identifier for the device compliance policy setting state summary to retrieve.",
  type: "string",
  required: true,
  clean: util.types.toString,
  dataSource: "selectDeviceCompliancePolicySettingStateSummary",
});
export const getDeviceCompliancePolicySettingStateSummaryInputs = {
  connection,
  deviceCompliancePolicySettingStateSummaryId,
};
export const listDeviceCompliancePoliciesInputs = {
  connection,
};
export const listDeviceCompliancePolicySettingStateSummariesInputs = {
  connection,
};
