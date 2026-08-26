import { input, util } from "@prismatic-io/spectral";
import { toOptionalNumber, toOptionalString } from "../util";
import { connection, fetchAll, pageSize } from "./common";
export const tagId = input({
  label: "Tag ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the tag.",
  clean: util.types.toString,
  placeholder: "Select a tag",
  dataSource: "selectTag",
  example: "12345",
});
const tagNameFilter = input({
  label: "Tag Name",
  type: "string",
  required: false,
  comments: "Filter tags by name (contains match).",
  clean: toOptionalString,
  placeholder: "Enter tag name",
  example: "LS:",
});
const parentTagId = input({
  label: "Parent Tag ID",
  type: "string",
  required: false,
  comments:
    "Filter tags by parent tag ID, or set the parent when creating a tag.",
  clean: toOptionalString,
  dataSource: "selectTag",
  placeholder: "Enter parent tag ID",
  example: "100",
});
const tagName = input({
  label: "Tag Name",
  type: "string",
  required: true,
  comments:
    "A descriptive label for the tag, such as 'LS:Environment=Production'.",
  clean: util.types.toString,
  placeholder: "Enter tag name",
  example: "LS:Environment=Production",
});
const color = input({
  label: "Color",
  type: "string",
  required: false,
  comments:
    "A hex color code (e.g. #FF5733) used to visually distinguish the tag in the Qualys UI.",
  clean: toOptionalString,
  placeholder: "Enter hex color code",
  example: "#FF5733",
});
const criticalityScore = input({
  label: "Criticality Score",
  type: "string",
  required: false,
  comments:
    "Tag criticality score (1-5). Qualys derives an asset's criticality as the maximum score across its tags.",
  clean: toOptionalNumber,
  placeholder: "3",
  example: "3",
});
const ruleType = input({
  label: "Rule Type",
  type: "string",
  required: false,
  comments: "Tag rule type (e.g., STATIC, GROOVY, OS_REGEX, NETWORK_RANGE).",
  clean: toOptionalString,
  placeholder: "Select a rule type",
  example: "STATIC",
  model: [
    { label: "Static", value: "STATIC" },
    { label: "Groovy", value: "GROOVY" },
    { label: "OS Regex", value: "OS_REGEX" },
    { label: "Network Range", value: "NETWORK_RANGE" },
    { label: "Name Contains", value: "NAME_CONTAINS" },
    { label: "Asset Search", value: "ASSET_SEARCH" },
  ],
});
const ruleText = input({
  label: "Rule Text",
  type: "string",
  required: false,
  comments:
    "Tag rule expression. Required for dynamic rule types (GROOVY, OS_REGEX, etc.).",
  clean: toOptionalString,
  placeholder: "Enter rule expression",
  example: "Windows.*Server",
});
const updateTagName = input({
  label: "Tag Name",
  type: "string",
  required: false,
  comments: "Updated tag name. Omitted fields are left untouched.",
  clean: toOptionalString,
  placeholder: "Enter new tag name",
  example: "LS:Environment=Staging",
});
export const listTagsInputs = {
  connection,
  fetchAll,
  pageSize,
  tagNameFilter,
  parentTagId,
};
export const createTagInputs = {
  connection,
  tagName,
  parentTagId,
  color,
  criticalityScore,
  ruleType,
  ruleText,
};
export const updateTagInputs = {
  connection,
  tagId,
  updateTagName,
  color,
  criticalityScore,
};
