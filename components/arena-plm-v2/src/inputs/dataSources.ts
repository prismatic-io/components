import { input, util } from "@prismatic-io/spectral";
import { toOptionalBoolean, toOptionalString } from "../util";
import { connectionInput, limitInput, offsetInput } from "./common";
export const categoriesPicklistObjectTypeInput = input({
  label: "Object Type",
  type: "string",
  required: true,
  comments: "The type of object to get categories for",
  model: [
    { label: "Items", value: "items" },
    { label: "Files", value: "files" },
    { label: "Changes", value: "changes" },
    { label: "Requests", value: "requests" },
  ],
  default: "changes",
  clean: util.types.toString,
});
export const categoriesPicklistPathInput = input({
  label: "Path",
  type: "string",
  required: false,
  placeholder: "Enter category path filter",
  comments: "Filter categories by path (optional)",
  example: "/Engineering/ECO",
  clean: toOptionalString,
});
export const categoriesPicklistIncludeDeletedInput = input({
  label: "Include Deleted",
  type: "string",
  required: false,
  comments: "Whether to include deleted categories in the results",
  model: [
    { label: "True", value: "true" },
    { label: "False", value: "false" },
    { label: "N/A", value: "na" },
  ],
  default: "na",
  clean: toOptionalBoolean,
});
export const categoriesPicklistAssignableInput = input({
  label: "Assignable Only",
  type: "string",
  required: false,
  comments: "Filter to only assignable categories",
  model: [
    { label: "True", value: "true" },
    { label: "False", value: "false" },
    { label: "N/A", value: "na" },
  ],
  default: "na",
  clean: toOptionalBoolean,
});
export const categoriesPicklistInputs = {
  connection: connectionInput,
  objectType: categoriesPicklistObjectTypeInput,
  path: categoriesPicklistPathInput,
  includeDeleted: categoriesPicklistIncludeDeletedInput,
  assignable: categoriesPicklistAssignableInput,
};
export const categoryAttributesObjectSelectionObjectTypeInput = input({
  label: "Object Type",
  type: "string",
  required: true,
  comments: "The type of object to get category attributes for",
  model: [
    { label: "Items", value: "items" },
    { label: "Files", value: "files" },
    { label: "Changes", value: "changes" },
    { label: "Requests", value: "requests" },
  ],
  default: "changes",
  clean: util.types.toString,
});
export const categoryAttributesObjectSelectionCategoryGuidInput = input({
  label: "Category GUID",
  type: "string",
  required: true,
  placeholder: "Enter category GUID",
  comments: "The GUID of the category to get attributes for",
  example: "DSTCCGB4AJ3YQQ39H2HVG92V",
  clean: util.types.toString,
});
export const categoryAttributesObjectSelectionIncludeInactiveInput = input({
  label: "Include Inactive Attributes",
  type: "boolean",
  required: false,
  comments: "When true, inactive attributes are included in the selection.",
  clean: util.types.toBool,
});
export const categoryAttributesObjectSelectionInputs = {
  connection: connectionInput,
  objectType: categoryAttributesObjectSelectionObjectTypeInput,
  categoryGuid: categoryAttributesObjectSelectionCategoryGuidInput,
  includeInactive: categoryAttributesObjectSelectionIncludeInactiveInput,
};
export const changeCategoryRoutingsPicklistCategoryGuidInput = input({
  label: "Category GUID",
  type: "string",
  required: true,
  placeholder: "Enter category GUID",
  comments:
    "The unique identifier (GUID) of the change category to get routings for",
  example: "DSEMMXWDIRAFEGB2EZKHHLXZ",
  clean: util.types.toString,
});
export const changeCategoryRoutingsPicklistInputs = {
  connection: connectionInput,
  categoryGuid: changeCategoryRoutingsPicklistCategoryGuidInput,
};
export const exportsPicklistNumberInput = input({
  label: "Export Number",
  placeholder: "Enter export number",
  type: "string",
  required: false,
  comments: "Filter by export number",
  clean: toOptionalString,
});
export const exportsPicklistNameInput = input({
  label: "Export Name",
  placeholder: "Enter export name",
  type: "string",
  required: false,
  comments: "Filter by export name",
  clean: toOptionalString,
});
export const exportsPicklistDescriptionInput = input({
  label: "Description",
  placeholder: "Enter description",
  type: "string",
  required: false,
  comments: "Filter by export description",
  clean: toOptionalString,
});
export const exportsPicklistCreatorGuidInput = input({
  label: "Creator GUID",
  placeholder: "Enter creator GUID",
  type: "string",
  required: false,
  comments: "Filter by creator GUID",
  example: "DS4KL5MN6OP7QR8ST9UV0WX1",
  clean: toOptionalString,
});
export const exportsPicklistCreatorEmailInput = input({
  label: "Creator Email",
  placeholder: "Enter creator email",
  type: "string",
  required: false,
  comments: "Filter by creator email",
  example: "alex.chen@example.com",
  clean: toOptionalString,
});
export const exportsPicklistCreatorFullNameInput = input({
  label: "Creator Full Name",
  placeholder: "Enter creator full name",
  type: "string",
  required: false,
  comments: "Filter by creator full name",
  example: "Alex Chen",
  clean: toOptionalString,
});
export const exportsPicklistInputs = {
  connection: connectionInput,
  number: exportsPicklistNumberInput,
  name: exportsPicklistNameInput,
  description: exportsPicklistDescriptionInput,
  creatorGuid: exportsPicklistCreatorGuidInput,
  creatorEmail: exportsPicklistCreatorEmailInput,
  creatorFullName: exportsPicklistCreatorFullNameInput,
  limit: limitInput,
  offset: offsetInput,
};
export const numberSequencePrefixesPicklistObjectTypeInput = input({
  label: "Object Type",
  type: "string",
  required: true,
  comments: "The type of object to get number sequence prefixes for",
  model: [
    { label: "Quality Processes", value: "qualityprocesses" },
    { label: "Requests", value: "requests" },
    { label: "Changes", value: "changes" },
    { label: "Tickets", value: "tickets" },
    { label: "Training Plans", value: "trainingplans" },
  ],
  default: "changes",
  clean: util.types.toString,
});
export const numberSequencePrefixesPicklistInputs = {
  connection: connectionInput,
  objectType: numberSequencePrefixesPicklistObjectTypeInput,
};
export const outboundEventIntegrationsPicklistNameInput = input({
  label: "Integration Name Filter",
  type: "string",
  required: false,
  placeholder: "Enter integration name filter",
  comments: "Filter integrations by name (optional)",
  clean: toOptionalString,
});
export const outboundEventIntegrationsPicklistEnabledInput = input({
  label: "Enabled Status Filter",
  type: "string",
  required: false,
  comments: "Filter by enabled/disabled status",
  model: [
    { label: "All", value: "all" },
    { label: "Enabled Only", value: "true" },
    { label: "Disabled Only", value: "false" },
  ],
  default: "all",
  clean: toOptionalString,
});
export const outboundEventIntegrationsPicklistInputs = {
  connection: connectionInput,
  name: outboundEventIntegrationsPicklistNameInput,
  enabled: outboundEventIntegrationsPicklistEnabledInput,
};
export const notificationJsonFormInputs = {
  connection: connectionInput,
};
export const qualityProcessTemplatesPicklistInputs = {
  connection: connectionInput,
};
export const integrationsPicklistNameInput = input({
  label: "Integration Name Filter",
  type: "string",
  required: false,
  placeholder: "Enter integration name filter",
  comments: "Filter outbound integrations by name (optional)",
  example: "Item Sync — Production",
  clean: toOptionalString,
});
export const integrationsPicklistEnabledInput = input({
  label: "Enabled Status Filter",
  type: "string",
  required: false,
  comments: "Filter by enabled/disabled status",
  model: [
    { label: "All", value: "all" },
    { label: "Enabled Only", value: "true" },
    { label: "Disabled Only", value: "false" },
  ],
  default: "all",
  example: "true",
  clean: toOptionalString,
});
export const integrationsPicklistInputs = {
  connection: connectionInput,
  name: integrationsPicklistNameInput,
  enabled: integrationsPicklistEnabledInput,
};
