import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { toOptionalString } from "../util";
import {
  connection,
  fetchAll,
  filter,
  page,
  pageSize,
  resourceId,
  sort,
} from "./common";
const scriptName = input({
  label: "Name",
  type: "string",
  required: true,
  comments: "The display name used to identify the script in Jamf Pro.",
  clean: util.types.toString,
  placeholder: "Enter script name",
  example: "Install Chrome",
});
const scriptContents = input({
  label: "Script Contents",
  type: "text",
  required: false,
  comments:
    "The shell script body. Include the shebang line (e.g., #!/bin/bash).",
  clean: toOptionalString,
  placeholder: "Enter script contents",
  example: "#!/bin/bash\n/usr/local/bin/install-app.sh",
});
const scriptCategoryId = input({
  label: "Category ID",
  type: "string",
  required: false,
  dataSource: "selectCategory",
  comments: "The unique identifier of the category to assign to this script.",
  clean: toOptionalString,
  placeholder: "Enter category ID",
  example: "3",
});
const scriptPriority = input({
  label: "Priority",
  type: "string",
  required: false,
  default: "AFTER",
  model: [
    { label: "BEFORE", value: "BEFORE" },
    { label: "AFTER", value: "AFTER" },
    { label: "AT_REBOOT", value: "AT_REBOOT" },
  ],
  comments: "When the script runs relative to the policy.",
  clean: toOptionalString,
  placeholder: "Enter priority",
  example: "AFTER",
});
const scriptInfo = input({
  label: "Info",
  type: "string",
  required: false,
  comments:
    "A description of the script displayed to administrators in Jamf Pro.",
  clean: toOptionalString,
  placeholder: "Enter script info",
  example: "Installs Google Chrome from the vendor CDN.",
});
const scriptNotes = input({
  label: "Notes",
  type: "string",
  required: false,
  comments: "Internal notes about the script visible only to administrators.",
  clean: toOptionalString,
  placeholder: "Enter notes",
  example: "Updated 2026-01-15 to support macOS 15.",
});
const createScriptAdditionalFields = structuredObjectInput({
  label: "Additional Fields",
  required: false,
  comments:
    "Additional optional fields: includes Script Contents, Priority, Info, and Notes.",
  inputs: {
    scriptContents,
    scriptPriority,
    scriptInfo,
    scriptNotes,
  },
});
export const createScriptInputs = {
  connection,
  scriptName,
  scriptCategoryId,
  additionalFields: createScriptAdditionalFields,
};
const scriptResourceId = {
  ...resourceId,
  label: "Script",
  comments: "The unique identifier of the script.",
  dataSource: "selectScript",
};
export const deleteScriptInputs = { connection, resourceId: scriptResourceId };
export const getScriptInputs = { connection, resourceId: scriptResourceId };
const pagination = structuredObjectInput({
  label: "Pagination",
  required: false,
  comments: "Page and page-size controls.",
  inputs: { page, pageSize },
});
export const listScriptsInputs = {
  connection,
  fetchAll,
  pagination,
  sort,
  filter,
};
const updateScriptName = {
  ...scriptName,
  required: false,
  clean: toOptionalString,
};
const updateScriptPriority = { ...scriptPriority, default: undefined };
const updateScriptAdditionalFields = structuredObjectInput({
  label: "Additional Fields",
  required: false,
  comments:
    "Additional optional fields: includes Name, Script Contents, Priority, Info, and Notes.",
  inputs: {
    scriptName: updateScriptName,
    scriptContents,
    scriptPriority: updateScriptPriority,
    scriptInfo,
    scriptNotes,
  },
});
export const updateScriptInputs = {
  connection,
  resourceId: scriptResourceId,
  scriptCategoryId,
  additionalFields: updateScriptAdditionalFields,
};
