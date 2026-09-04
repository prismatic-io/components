import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import {
  toKeyValueListArray,
  toOptionalBoolean,
  toOptionalNumber,
  toOptionalObject,
  toOptionalString,
} from "../util";
export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The Arena connection to use.",
});
export const changeGuidInput = input({
  label: "Change GUID",
  type: "string",
  required: true,
  placeholder: "Enter change GUID",
  comments: "GUID of the change to update.",
  example: "GN1AB2CD3EF4GH5IJ6KL7MN8",
  clean: util.types.toString,
});
export const additionalAttributesInput = input({
  label: "Additional Attributes",
  type: "string",
  collection: "keyvaluelist",
  required: false,
  placeholder: "Enter additional attributes",
  comments:
    "Additional custom attributes for the object. Key should be the attribute GUID, value should be the attribute value.",
  example: "attr-guid-123: Custom Value",
  clean: toKeyValueListArray,
});
export const attributeDefinitionsInput = input({
  label: "Attribute Definitions",
  type: "data",
  required: false,
  comments:
    "List of CategoryAttributeDefinitionVo objects that define the types and properties of attributes. This is required when creating additional attributes to ensure proper value type conversion (e.g., NUMBER/POSITIVE_DOUBLE/COST types will be parsed as numbers).",
  clean: toOptionalObject,
});
export const additionalAttributeJsonInput = input({
  label: "Additional Attribute JSON",
  type: "data",
  required: false,
  comments:
    "Provide additional attributes as raw JSON. If provided, this will be used instead of additionalAttributes and attributeDefinitions.",
  clean: toOptionalObject,
});
export const itemGuidInput = input({
  label: "Item GUID",
  type: "string",
  required: true,
  placeholder: "Enter item GUID",
  comments: "The GUID of the item.",
  example: "GN1AB2CD3EF4GH5IJ6KL7MN8",
  clean: util.types.toString,
});
export const fileInput = input({
  label: "File",
  type: "data",
  required: true,
  comments: "The file to upload to Arena. Supports files up to 2GB in size.",
  clean: util.types.toData,
});
export const fileTitleInput = input({
  label: "File Title",
  type: "string",
  required: true,
  placeholder: "Enter file title",
  comments: "The title/name for the file in Arena.",
  example: "Product Specification Document",
  clean: util.types.toString,
});
export const fileDescriptionInput = input({
  label: "File Description",
  type: "text",
  required: false,
  placeholder: "Enter file description",
  comments: "Optional description for the file.",
  example: "Technical specification document for product version 2.1",
  clean: toOptionalString,
});
export const fileFormatInput = input({
  label: "File Format",
  type: "string",
  required: false,
  placeholder: "Enter file format",
  comments:
    "File format/extension (e.g., 'pdf', 'docx', 'png'). If not specified, will be extracted from file name.",
  example: "pdf",
  clean: toOptionalString,
});
export const storageMethodNameInput = input({
  label: "Storage Method",
  type: "string",
  required: false,
  placeholder: "Enter storage method",
  default: "FILE",
  comments:
    "Storage method for the file. Use 'FILE' to store on Arena servers, 'FTP' for FTP server, 'WEB' for web link, or 'PLACE_HOLDER' for placeholder.",
  example: "FILE",
  clean: toOptionalString,
});
export const fileCategoryGuidInput = input({
  label: "File Category GUID",
  type: "string",
  required: false,
  placeholder: "Enter file category GUID",
  comments: "GUID of the category to filter files by.",
  example: "GNSGE2D4YMGB4UITKVB7KZSW",
  clean: toOptionalString,
});
export const fileGuidInput = input({
  label: "File GUID",
  type: "string",
  required: true,
  placeholder: "Enter file GUID",
  clean: util.types.toString,
  comments: "The unique identifier (GUID) of the file.",
  example: "GNZAQ5I94Y9DGMRS8NENGR3R",
});
export const setNullInput = input({
  label: "Set Null Fields",
  type: "boolean",
  required: false,
  default: "false",
  comments: "When true, empty or null fields are set explicitly (for updates).",
  clean: util.types.toBool,
});
export const includeEmptyAdditionalAttributesInput = input({
  label: "Include Empty Additional Attributes",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "When true, empty additional attributes are included in the response.",
  clean: util.types.toBool,
});
export const limitInput = input({
  label: "Limit",
  type: "string",
  required: false,
  placeholder: "Enter limit",
  comments: "Maximum number of results to return (default 20, max 400).",
  example: "50",
  clean: toOptionalNumber,
});
export const offsetInput = input({
  label: "Offset",
  type: "string",
  required: false,
  placeholder: "Enter offset",
  comments: "Number of results to skip (default 0).",
  example: "0",
  clean: toOptionalNumber,
});
export const pagination = structuredObjectInput({
  label: "Pagination",
  required: false,
  comments:
    "Maximum number of results to return and number of results to skip.",
  inputs: { limit: limitInput, offset: offsetInput },
});
export const fetchAllInput = input({
  label: "Fetch All",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "When true, automatically retrieves every page of results. The Pagination Limit is ignored, while Offset is honored as the starting point.",
  clean: util.types.toBool,
});
export const fileEditionInput = input({
  label: "File Edition",
  type: "string",
  required: false,
  placeholder: "Enter file edition",
  clean: toOptionalString,
  comments:
    "Edition of the file, which Arena increments each time new content is checked in.",
  example: "1.0",
});
export const filePrivateInput = input({
  label: "File Private",
  type: "boolean",
  required: false,
  clean: util.types.toBool,
  comments: "When true, the file is private.",
  example: "false",
});
export const fileAuthorFullNameInput = input({
  label: "File Author Full Name",
  type: "string",
  required: false,
  placeholder: "Enter file author full name",
  clean: toOptionalString,
  comments: "Full name of the file author.",
  example: "John Doe",
});
export const fileStorageMethodNameInput = input({
  label: "File Storage Method Name",
  type: "string",
  required: false,
  placeholder: "Enter file storage method name",
  clean: toOptionalString,
  comments: "Storage method holding the file: FILE, FTP, WEB or PLACE_HOLDER.",
  example: "Default Storage",
});
export const latestEditionAssociationInput = input({
  label: "Latest Edition Association",
  type: "boolean",
  required: false,
  clean: util.types.toBool,
  comments: "When true, the file is associated with its latest edition.",
  example: "true",
});
export const primaryFileInput = input({
  label: "Primary File",
  type: "boolean",
  required: false,
  default: "false",
  comments: "When true, this is the primary file association.",
  clean: util.types.toBool,
});
export const nameInput = input({
  label: "Name",
  type: "string",
  required: false,
  placeholder: "Enter name",
  comments:
    "Name of the resource. Used as a filter on list actions and as the value to set on create and update actions.",
  clean: toOptionalString,
});
export const statusInput = input({
  label: "Status",
  type: "string",
  required: false,
  placeholder: "Enter status",
  comments:
    "Lifecycle status of the resource. Accepted values depend on the resource type.",
  clean: toOptionalString,
});
export const numberInput = input({
  label: "Number",
  type: "string",
  required: false,
  placeholder: "Enter number",
  comments:
    "Arena-assigned number identifying the resource, distinct from its GUID.",
  clean: toOptionalString,
});
export const descriptionInput = input({
  label: "Description",
  type: "string",
  required: false,
  placeholder: "Enter description",
  comments: "Free-text description of the resource.",
  clean: toOptionalString,
});
export const titleInput = input({
  label: "Title",
  type: "string",
  required: false,
  placeholder: "Enter title",
  comments: "Human-readable title of the resource, shown in the Arena UI.",
  clean: toOptionalString,
});
export const objectTypeInput = input({
  label: "Object Type",
  placeholder: "Enter object type",
  type: "string",
  required: false,
  comments:
    "Arena resource family the request applies to, such as items, changes, requests or files.",
  clean: toOptionalString,
});
export const includeDeletedInput = input({
  label: "Include Deleted",
  type: "string",
  required: false,
  comments: "Whether to include deleted records in the results.",
  model: [
    { label: "True", value: "true" },
    { label: "False", value: "false" },
    { label: "N/A", value: "na" },
  ],
  default: "na",
  clean: toOptionalBoolean,
});
export const categoryGuidInput = input({
  label: "Category GUID",
  type: "string",
  required: false,
  placeholder: "Enter category GUID",
  comments: "The GUID of the category.",
  example: "GNLMBALQ4EZWDYIEZCJSHGRK",
  clean: toOptionalString,
});
export const includeChildCategoriesInput = input({
  label: "Include Child Categories",
  type: "boolean",
  required: false,
  comments: "When true, records from child categories are included.",
  clean: util.types.toBool,
});
export const searchableOnlyInput = input({
  label: "Searchable Only",
  type: "string",
  required: false,
  comments: "Filter to only attributes that can be searched.",
  model: [
    { label: "True", value: "true" },
    { label: "False", value: "false" },
    { label: "N/A", value: "na" },
  ],
  default: "na",
  clean: toOptionalBoolean,
});
export const includePossibleValuesInput = input({
  label: "Include Possible Values",
  type: "string",
  required: false,
  comments: "Whether to include possible values for attributes.",
  model: [
    { label: "True", value: "true" },
    { label: "False", value: "false" },
    { label: "N/A", value: "na" },
  ],
  default: "na",
  clean: toOptionalBoolean,
});
export const editableOnlyInput = input({
  label: "Editable Only",
  type: "string",
  required: false,
  comments: "Filter to only attributes that can be edited.",
  model: [
    { label: "True", value: "true" },
    { label: "False", value: "false" },
    { label: "N/A", value: "na" },
  ],
  default: "na",
  clean: toOptionalBoolean,
});
export const creatableOnlyInput = input({
  label: "Creatable Only",
  type: "string",
  required: false,
  comments: "Filter to only attributes that can be set during creation.",
  model: [
    { label: "True", value: "true" },
    { label: "False", value: "false" },
    { label: "N/A", value: "na" },
  ],
  default: "na",
  clean: toOptionalBoolean,
});
export const creatorGuidInput = input({
  label: "Creator GUID",
  type: "string",
  required: false,
  placeholder: "Enter creator GUID",
  comments: "Filter by creator GUID.",
  example: "GN4KL5MN6OP7QR8ST9UV0WX1",
  clean: toOptionalString,
});
export const creatorFullNameInput = input({
  label: "Creator Full Name",
  type: "string",
  required: false,
  placeholder: "Enter creator full name",
  comments: "Filter by creator full name.",
  example: "Alex Chen",
  clean: toOptionalString,
});
export const creatorEmailInput = input({
  label: "Creator Email",
  type: "string",
  required: false,
  placeholder: "Enter creator email",
  comments: "Filter by creator email.",
  example: "alex.chen@example.com",
  clean: toOptionalString,
});
export const stepGuidInput = input({
  label: "Step GUID",
  type: "string",
  required: false,
  placeholder: "Enter step GUID",
  comments: "The GUID of the quality process step.",
  example: "GN4KL5MN6OP7QR8ST9UV0WX1",
  clean: toOptionalString,
});
export const qualityProcessGuidInput = input({
  label: "Quality Process GUID",
  type: "string",
  required: true,
  placeholder: "Enter quality process GUID",
  comments: "The GUID of the quality process.",
  example: "GN4KL5MN6OP7QR8ST9UV0WX1",
  clean: util.types.toString,
});
export const notesInput = input({
  label: "Notes",
  type: "text",
  required: false,
  placeholder: "Enter notes",
  comments: "Free-text notes stored on the record for later reference.",
  clean: toOptionalString,
});
export const guidInput = input({
  label: "GUID",
  type: "string",
  required: false,
  placeholder: "Enter GUID",
  comments: "The GUID of the object.",
  example: "GN4KL5MN6OP7QR8ST9UV0WX1",
  clean: toOptionalString,
});
export const commentInput = input({
  label: "Comment",
  type: "text",
  required: false,
  placeholder: "Enter comment",
  comments:
    "A comment recorded alongside the operation, retained in the record history.",
  clean: toOptionalString,
});
export const commentsInput = input({
  label: "Comments",
  type: "text",
  required: false,
  placeholder: "Enter comments",
  comments: "Free-text comments stored on the record.",
  clean: toOptionalString,
});
export const activeInput = input({
  label: "Active Only",
  type: "boolean",
  required: false,
  default: "true",
  comments: "When true, only active records are shown.",
  clean: util.types.toBool,
});
export const userGuidInput = input({
  label: "User GUID",
  type: "string",
  required: false,
  placeholder: "Enter user GUID",
  comments: "The GUID of the user.",
  example: "GN4KL5MN6OP7QR8ST9UV0WX1",
  clean: toOptionalString,
});
export const userInput = input({
  label: "User",
  type: "string",
  required: false,
  placeholder: "Enter user",
  comments: "Filter by user access.",
  clean: toOptionalString,
});
export const templateGuidInput = input({
  label: "Template GUID",
  type: "string",
  required: true,
  placeholder: "Enter template GUID",
  comments: "The GUID of the template.",
  example: "GN1AB2CD3EF4GH5IJ6KL7MN8",
  clean: util.types.toString,
});
export const runDataInput = input({
  label: "Run Data",
  type: "data",
  required: false,
  comments: "Optional parameters for the run.",
  clean: toOptionalObject,
});
export const priorityInput = input({
  label: "Priority",
  type: "string",
  required: false,
  placeholder: "Enter priority",
  comments:
    "Relative priority assigned to the resource, such as High, Medium or Low.",
  clean: toOptionalString,
});
export const pathInput = input({
  label: "Path",
  type: "string",
  required: false,
  placeholder: "Enter category path filter",
  comments: "Filter categories by path.",
  example: "/Engineering/ECO",
  clean: toOptionalString,
});
export const numberSequencePrefixInput = input({
  label: "Number Sequence Prefix",
  type: "string",
  required: false,
  placeholder: "Enter number sequence prefix",
  comments: "Prefix for the number sequence.",
  example: "ECO",
  clean: toOptionalString,
});
export const fileContentInput = input({
  label: "File Content",
  type: "data",
  required: false,
  comments: "The file content to upload (binary format).",
  clean: util.types.toData,
});
export const dueDateInput = input({
  label: "Due Date",
  type: "string",
  required: false,
  placeholder: "Enter due date",
  comments: "The due date (ISO 8601 format).",
  example: "2026-05-10T09:15:00Z",
  clean: toOptionalString,
});
export const assigneeGuidInput = input({
  label: "Assignee GUID",
  type: "string",
  required: false,
  placeholder: "Enter assignee GUID",
  comments: "The GUID of the assignee.",
  example: "GN4KL5MN6OP7QR8ST9UV0WX1",
  clean: toOptionalString,
});
export const assignableInput = input({
  label: "Assignable",
  type: "string",
  required: false,
  comments: "Filter to only assignable categories.",
  model: [
    { label: "True", value: "true" },
    { label: "False", value: "false" },
    { label: "N/A", value: "na" },
  ],
  default: "na",
  clean: toOptionalBoolean,
});
export const actionInput = input({
  label: "Action",
  type: "string",
  required: false,
  placeholder: "Enter action",
  comments: "Filter by the specified action.",
  clean: toOptionalString,
});
