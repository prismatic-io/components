import { input, util } from "@prismatic-io/spectral";
import {
  attachmentId,
  columnId,
  connectionInput,
  discussionId,
  folderId,
  includeAll,
  modifiedSince,
  page,
  pageSize,
  rowIdOptional,
  sheetId,
  validateId,
  workspaceIdOptional,
} from "./common";

const commentId = input({
  label: "Comment ID",
  type: "string",
  required: true,
  clean: validateId,
  comments: "The unique identifier for the comment.",
  example: "3888061631401860",
  placeholder: "Enter comment ID",
});

const text = input({
  label: "Text",
  type: "string",
  required: true,
  clean: util.types.toString,
  comments: "The text content of the comment.",
  placeholder: "Enter comment text",
});

const comment = input({
  label: "Comment",
  type: "string",
  required: true,
  clean: util.types.toString,
  comments: "The text content to post as a new discussion comment.",
  placeholder: "Enter comment text",
});

const destinationId = input({
  label: "Destination ID",
  type: "string",
  required: false,
  clean: (value) => validateId(value, false),
  comments:
    "The ID of the destination container (when copying or moving a sheet or a folder).",
  placeholder: "Enter destination ID",
});

const destinationType = input({
  label: "Destination Type",
  type: "string",
  required: true,
  default: "home",
  model: [
    { label: "Folder", value: "folder" },
    { label: "Home", value: "home" },
    { label: "Workspace", value: "workspace" },
  ],
  clean: util.types.toString,
  comments: "The type of container to copy or move the resource into.",
});

const newName = input({
  label: "New Name",
  type: "string",
  required: false,
  clean: (value) => util.types.toString(value) || undefined,
  comments: "The display name to assign to the copied resource.",
  placeholder: "Enter new name",
});

const sheetName = input({
  label: "Sheet Name",
  type: "string",
  required: true,
  clean: util.types.toString,
  comments: "The display name for the new sheet.",
  placeholder: "Enter sheet name",
});

const columns = input({
  label: "Columns",
  type: "code",
  required: true,
  language: "json",
  clean: (value) => JSON.parse(util.types.toString(value)),
  default: JSON.stringify(
    [
      { title: "Favorite", type: "CHECKBOX", symbol: "STAR" },
      { title: "Primary Column", primary: true, type: "TEXT_NUMBER" },
    ],
    null,
    2,
  ),
  comments:
    "See [Smartsheet API documentation](https://developers.smartsheet.com/api/smartsheet/openapi/columns) for additional information about column types.",
});

const columnTitle = input({
  label: "Title",
  type: "string",
  required: true,
  clean: util.types.toString,
  comments: "The display name for the column header.",
  placeholder: "Enter column title",
});

const columnType = input({
  label: "Type",
  type: "string",
  required: true,
  model: [
    { label: "ABSTRACT DATETIME", value: "ABSTRACT_DATETIME" },
    { label: "CHECKBOX", value: "CHECKBOX" },
    { label: "CONTACT LIST", value: "CONTACT_LIST" },
    { label: "DATE", value: "DATE" },
    { label: "DATETIME", value: "DATETIME" },
    { label: "DURATION", value: "DURATION" },
    { label: "MULTI CONTACT LIST", value: "MULTI_CONTACT_LIST" },
    { label: "MULTI PICKLIST", value: "MULTI_PICKLIST" },
    { label: "PICKLIST", value: "PICKLIST" },
    { label: "PREDECESSOR", value: "PREDECESSOR" },
    { label: "TEXT NUMBER", value: "TEXT_NUMBER" },
  ],
  clean: util.types.toString,
  comments:
    "The data type for the column. Determines how cell values are displayed and validated.",
});

const formula = input({
  label: "Formula",
  type: "string",
  required: false,
  clean: (value) => util.types.toString(value) || undefined,
  comments: "The formula for a column.",
  placeholder: "Enter formula",
});

const hidden = input({
  label: "Hidden",
  type: "boolean",
  required: false,
  clean: util.types.toBool,
  comments: "When true, the column is hidden from view in the sheet.",
});

const columnIndex = input({
  label: "Position Index",
  type: "string",
  required: true,
  default: "0",
  clean: (value) => util.types.toInt(value, 0),
  comments:
    "The 0-based position where the column should be inserted in the sheet.",
  placeholder: "Enter position index",
});

const columnDescription = input({
  label: "Description",
  type: "string",
  required: false,
  clean: (value) => util.types.toString(value) || undefined,
  comments:
    "Additional context or instructions displayed below the column header.",
  placeholder: "Enter column description",
});

const locked = input({
  label: "Locked",
  type: "boolean",
  required: false,
  clean: util.types.toBool,
  comments:
    "When true, the column is locked and cannot be edited by users without appropriate permissions.",
});

const options = input({
  label: "Options",
  comments:
    "A JSON array of selectable values for picklist or multi-picklist columns.",
  type: "string",
  required: false,
  clean: (value) =>
    util.types.isJSON(util.types.toString(value))
      ? JSON.parse(util.types.toString(value))
      : undefined,
  placeholder: "Enter picklist options as JSON array",
});

const columnValidation = input({
  label: "Validation",
  type: "boolean",
  required: false,
  clean: util.types.toBool,
  comments:
    "When true, cell value validation rules are enforced for the column.",
});

const width = input({
  label: "Width",
  type: "string",
  required: false,
  clean: (value) => util.types.toNumber(value) || undefined,
  comments: "Display width of the column in pixels.",
  placeholder: "Enter width in pixels",
});

const icalEnabled = input({
  label: "iCal Enabled",
  type: "boolean",
  required: true,
  default: "false",
  clean: util.types.toBool,
  comments:
    "When true, a webcal feed is published for the calendar in the sheet.",
});

const readOnlyFullAccessibleBy = input({
  label: "Read Only Full Accessible By",
  type: "string",
  required: true,
  default: "ALL",
  model: [
    { label: "ALL", value: "ALL" },
    { label: "ORG", value: "ORG" },
  ],
  clean: util.types.toString,
  comments:
    "The audience that can access the read-only full view of the published sheet. ALL allows anyone with the link; ORG restricts access to the organization.",
});

const readOnlyFullDefaultView = input({
  label: "Read Only Full Default View",
  type: "string",
  required: true,
  default: "CALENDAR",
  model: [
    { label: "CALENDAR", value: "CALENDAR" },
    { label: "CARD", value: "CARD" },
    { label: "GRID", value: "GRID" },
  ],
  clean: util.types.toString,
  comments:
    "The default layout shown when viewers open the read-only full published sheet.",
});

const readOnlyFullEnabled = input({
  label: "Read Only Full Enabled",
  type: "boolean",
  required: false,
  default: "true",
  clean: util.types.toBool,
  comments:
    "When true, publishes a rich read-only version of the sheet that allows viewers to download row attachments and discussions.",
});

const readOnlyLiteEnabled = input({
  label: "Read Only Lite Enabled",
  type: "boolean",
  required: true,
  default: "false",
  clean: util.types.toBool,
  comments:
    "When true, publishes a lightweight read-only version of the sheet without row attachments or discussions.",
});

const readWriteAccessibleBy = input({
  label: "Read Write Accessible By",
  type: "string",
  required: true,
  default: "ALL",
  model: [
    { label: "ALL", value: "ALL" },
    { label: "ORG", value: "ORG" },
  ],
  clean: util.types.toString,
  comments:
    "The audience that can edit the published sheet. ALL allows anyone with the link; ORG restricts access to the organization.",
});

const readWriteDefaultView = input({
  label: "Read Write Default View",
  type: "string",
  required: true,
  default: "CALENDAR",
  model: [
    { label: "CALENDAR", value: "CALENDAR" },
    { label: "CARD", value: "CARD" },
    { label: "GRID", value: "GRID" },
  ],
  clean: util.types.toString,
  comments:
    "The default layout shown when editors open the read-write published sheet.",
});

const readWriteEnabled = input({
  label: "Read Write Enabled",
  type: "boolean",
  required: true,
  default: "true",
  clean: util.types.toBool,
  comments:
    "When true, publishes a rich version of the sheet that allows editors to modify cells and manage attachments and discussions.",
});

const format = input({
  label: "Format",
  type: "string",
  required: true,
  default: "EXCEL",
  model: [
    { value: "EXCEL", label: "EXCEL" },
    { value: "PDF", label: "PDF" },
    { value: "PDF_GANTT", label: "PDF_GANTT" },
  ],
  clean: util.types.toString,
  comments: "The file format to use when sending the sheet.",
});

const paperSize = input({
  label: "Paper Size",
  type: "string",
  required: true,
  default: "LETTER",
  clean: util.types.toString,
  model: [
    { value: "LETTER", label: "LETTER" },
    { value: "LEGAL", label: "LEGAL" },
    { value: "WIDE", label: "WIDE" },
    { value: "ARCHD", label: "ARCHD" },
    { value: "A4", label: "A4" },
    { value: "A3", label: "A3" },
    { value: "A2", label: "A2" },
    { value: "A1", label: "A1" },
    { value: "A0", label: "A0" },
  ],
  comments: "The paper size to use when generating the PDF.",
});

const emails = input({
  label: "Emails",
  type: "string",
  required: false,
  collection: "valuelist",
  comments: "The email addresses of recipients to send the document to.",
  placeholder: "Enter email address",
});

const sendGroups = input({
  label: "Group IDs",
  type: "string",
  required: false,
  collection: "valuelist",
  comments: "The group IDs of recipients to send the document to.",
  placeholder: "Enter group ID",
});

const ccMe = input({
  label: "CC Me",
  type: "boolean",
  required: false,
  clean: util.types.toBool,
  comments: "When true, sends a copy of the email to the sender.",
});

const message = input({
  label: "Message",
  type: "string",
  required: false,
  clean: (value) => util.types.toString(value) || undefined,
  comments: "The message of the email.",
  placeholder: "Enter email message",
});

const emailSubject = input({
  label: "Subject",
  type: "string",
  required: false,
  clean: (value) => util.types.toString(value) || undefined,
  comments: "The subject line of the email.",
  placeholder: "Enter email subject",
});

const updateSheetName = input({
  label: "New Name",
  type: "string",
  required: true,
  clean: util.types.toString,
  comments: "The updated display name for the sheet.",
  placeholder: "Enter new sheet name",
});

export const attachmentsGetInputs = {
  connection: connectionInput,
  sheetId,
  attachmentId,
};

export const attachmentsListOnSheetInputs = {
  connection: connectionInput,
  sheetId,
  includeAll,
  page,
  pageSize,
};

export const columnDeleteInputs = {
  connection: connectionInput,
  sheetId,
  columnId,
};

export const columnGetInputs = {
  connection: connectionInput,
  sheetId,
  columnId,
};

export const columnsAddToSheetInputs = {
  connection: connectionInput,
  sheetId,
  title: columnTitle,
  type: columnType,
  formula,
  hidden,
  index: columnIndex,
  description: columnDescription,
  locked,
  options,
  validation: columnValidation,
  width,
};

export const columnsListOnSheetInputs = {
  connection: connectionInput,
  sheetId,
  includeAll,
  page,
  pageSize,
};

export const commentDeleteInputs = {
  connection: connectionInput,
  sheetId,
  commentId,
};

export const commentEditInputs = {
  connection: connectionInput,
  sheetId,
  commentId,
  text,
};

export const commentGetInputs = {
  connection: connectionInput,
  sheetId,
  commentId,
};

export const commentsCreateInputs = {
  connection: connectionInput,
  sheetId,
  discussionId,
  text,
};

export const copySheetInputs = {
  connection: connectionInput,
  sheetId,
  destinationId,
  destinationType,
  newName,
};

export const createSheetInputs = {
  connection: connectionInput,
  folderId: {
    ...folderId,
    required: false,
    comments:
      "The unique identifier of the folder to create the sheet in. Omit to create a top-level sheet.",
  },
  workspaceId: workspaceIdOptional,
  name: sheetName,
  columns,
};

export const deleteSheetInputs = {
  connection: connectionInput,
  sheetId,
};

export const discussionDeleteInputs = {
  connection: connectionInput,
  sheetId,
  discussionId,
};

export const discussionGetInputs = {
  connection: connectionInput,
  sheetId,
  discussionId,
};

export const discussionListAttachmentsInputs = {
  connection: connectionInput,
  sheetId,
  discussionId,
  includeAll,
  page,
  pageSize,
};

export const discussionsCreateInputs = {
  connection: connectionInput,
  sheetId,
  rowId: rowIdOptional,
  comment,
};

export const discussionsListInputs = {
  connection: connectionInput,
  sheetId,
  includeAll,
  page,
  pageSize,
  rowId: rowIdOptional,
};

export const getSheetInputs = {
  connection: connectionInput,
  sheetId,
  page,
  pageSize,
};

export const getSheetPublishInputs = {
  connection: connectionInput,
  sheetId,
};

export const getSheetVersionInputs = {
  connection: connectionInput,
  sheetId,
};

export const listSheetsInputs = {
  connection: connectionInput,
  includeAll,
  page,
  pageSize,
  modifiedSince,
};

export const moveSheetInputs = {
  connection: connectionInput,
  sheetId,
  destinationId,
  destinationType,
};

export const setSheetPublishInputs = {
  connection: connectionInput,
  sheetId,
  icalEnabled,
  readOnlyFullAccessibleBy,
  readOnlyFullDefaultView,
  readOnlyFullEnabled,
  readOnlyLiteEnabled,
  readWriteAccessibleBy,
  readWriteDefaultView,
  readWriteEnabled,
};

export const sheetSendInputs = {
  connection: connectionInput,
  sheetId,
  format,
  paperSize,
  emails,
  groups: sendGroups,
  ccMe,
  message,
  subject: emailSubject,
};

export const updateSheetInputs = {
  connection: connectionInput,
  sheetId,
  name: updateSheetName,
};
