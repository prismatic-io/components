import { input, util } from "@prismatic-io/spectral";
import { cleanNumberInput, cleanStringInput } from "../../util";
import { additionalFields } from "../common";

const assetsDocumentationComments =
  "See [Freshservice API documentation](https://api.freshservice.com/#asset_attributes) for more information.";

export const assetsAdditionalFields = input({
  ...additionalFields,
  comments: `${additionalFields.comments} ${assetsDocumentationComments}`,
});

const usageTypeOptions = [
  { label: "Loaner", value: "loaner" },
  { label: "Permanent", value: "permanent" },
];

const impactOptions = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
];

export const name = input({
  label: "Name",
  comments: "The display name used to identify the asset.",
  type: "string",
  required: true,
  example: "Macbook Pro",
  placeholder: "Enter asset name",
  clean: util.types.toString,
});

export const assetTypeId = input({
  label: "Asset Type ID",
  comments: "The unique identifier for the asset type classification.",
  type: "string",
  required: true,
  example: "25",
  placeholder: "Enter asset type ID",
  clean: util.types.toNumber,
});

export const assetTag = input({
  label: "Asset Tag",
  comments: "The tracking label assigned to the asset for inventory purposes.",
  type: "string",
  required: false,
  example: "ASSET-9",
  placeholder: "Enter asset tag",
  clean: cleanStringInput,
});

export const impact = input({
  label: "Impact",
  comments: "The business impact level if the asset becomes unavailable.",
  type: "string",
  required: false,
  example: "low",
  placeholder: "Enter impact level",
  model: impactOptions,
  clean: cleanStringInput,
});

export const usageType = input({
  label: "Usage Type",
  comments: "Whether the asset is permanently assigned or a loaner.",
  type: "string",
  required: false,
  model: usageTypeOptions,
  example: "permanent",
  placeholder: "Enter usage type",
  clean: cleanStringInput,
});

export const description = input({
  label: "Description",
  comments: "A detailed summary of the asset specifications or purpose.",
  type: "string",
  required: false,
  example:
    "13.3-inch (diagonal) LED-backlit glossy widescreen display,1440-by-900 resolution",
  placeholder: "Enter asset description",
  clean: cleanStringInput,
});

export const locationId = input({
  label: "Location ID",
  comments:
    "The unique identifier for the location where the asset is assigned.",
  type: "string",
  required: false,
  example: "1",
  placeholder: "Enter location ID",
  clean: cleanNumberInput,
});

export const agentId = input({
  label: "Agent ID",
  comments: "The unique identifier for the agent managing the asset.",
  type: "string",
  required: false,
  example: "1",
  placeholder: "Enter agent ID",
  dataSource: "selectAgent",
  clean: cleanNumberInput,
});

export const departmentId = input({
  label: "Department ID",
  comments: "The unique identifier for the department assigned to the asset.",
  type: "string",
  required: false,
  example: "1",
  placeholder: "Enter department ID",
  clean: cleanNumberInput,
});

export const groupId = input({
  label: "Group ID",
  comments: "The unique identifier for the agent group managing the asset.",
  type: "string",
  required: false,
  example: "1",
  placeholder: "Enter group ID",
  clean: cleanNumberInput,
});

export const workspaceId = input({
  label: "Workspace ID",
  comments:
    "The unique identifier for the workspace the asset belongs to. Defaults to the primary workspace if not provided. Applicable only to accounts on Employee Support Mode.",
  type: "string",
  required: false,
  example: "1",
  placeholder: "Enter workspace ID",
  dataSource: "selectWorkspace",
  clean: cleanNumberInput,
});

export const searchQuery = input({
  label: "Search Query",
  comments:
    "The filter expression to search assets. Supported fields are name, asset_tag, and serial_number.",
  type: "string",
  required: true,
  example: `"name:'dell'"`,
  placeholder: "Enter search query",
  clean: util.types.toString,
});

export const assetDisplayId = input({
  label: "Asset Display ID",
  comments: "The unique display identifier for the asset.",
  type: "string",
  required: true,
  example: "1",
  placeholder: "Enter asset display ID",
  dataSource: "selectAsset",
  clean: util.types.toNumber,
});
