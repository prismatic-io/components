import { input, util } from "@prismatic-io/spectral";

export const deviceCompliancePolicyId = input({
  label: "Device Compliance Policy Id",
  example: "705c034c-034c-705c-4c03-5c704c035c70",
  placeholder: "Enter device compliance policy ID",
  comments: "Unique Identifier for the device compliance policy to retrieve.",
  type: "string",
  required: true,
  clean: util.types.toString,
  dataSource: "selectDeviceCompliancePolicy",
});

export const assignId = input({
  label: "Assign Id",
  example: "705c034c-034c-705c-4c03-5c704c035c70",
  placeholder: "Enter assignment ID",
  comments: "The unique identifier for the policy assignment.",
  type: "string",
  required: true,
  clean: util.types.toString,
});

export const target = input({
  label: "Target",
  type: "string",
  comments:
    "The device compliance policy assignment target type (e.g., configurationManagerCollectionAssignmentTarget, groupAssignmentTarget).",
  required: true,
  example: "microsoft.graph.configurationManagerCollectionAssignmentTarget",
  placeholder: "Enter target type",
  clean: util.types.toString,
});

export const collectionId = input({
  label: "Collection Id",
  example: "705c034c-034c-705c-4c03-5c704c035c70",
  placeholder: "Enter collection ID",
  comments:
    "The unique identifier for the Configuration Manager target collection.",
  type: "string",
  required: true,
  clean: util.types.toString,
});
