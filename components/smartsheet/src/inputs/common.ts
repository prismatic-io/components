import { input, util } from "@prismatic-io/spectral";

export const validateId = (value: unknown, required = true) => {
  if (!value && !required) {
    return undefined;
  }
  try {
    return util.types.toInt(value);
  } catch {
    throw new Error(
      `Smartsheet global IDs are numbers. "${value}" is not a valid Smartsheet global ID.`,
    );
  }
};

export const page = input({
  label: "Pagination Page (Deprecated)",
  type: "string",
  required: false,
  default: "1",
  clean: (value) => util.types.toNumber(value) || undefined,
  comments:
    "DEPRECATED — has no effect on actions migrated for the 2026-06-03 Smartsheet sunset. Preserved for backwards compatibility on those actions; will be removed in a future major release.",
  placeholder: "Enter page number",
});

export const pageSize = input({
  label: "Pagination Page Size (Deprecated)",
  type: "string",
  required: false,
  clean: (value) => util.types.toNumber(value) || undefined,
  comments:
    "DEPRECATED — has no effect on actions migrated for the 2026-06-03 Smartsheet sunset. Preserved for backwards compatibility on those actions; will be removed in a future major release.",
  placeholder: "Enter page size",
});

export const includeAll = input({
  label: "Fetch All (Deprecated)",
  type: "boolean",
  required: false,
  default: "false",
  clean: util.types.toBool,
  comments:
    "DEPRECATED — has no effect on actions migrated for the 2026-06-03 Smartsheet sunset. Preserved for backwards compatibility on those actions; will be removed in a future major release.",
});

export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The Smartsheet connection to use.",
});

export const modifiedSince = input({
  label: "Modified Since",
  type: "string",
  required: false,
  clean: (value) => util.types.toString(value) || undefined,
  comments:
    "When specified, the response only includes objects modified on or after this date and time. Format: ISO 8601 (e.g. 2023-01-01T00:00:00Z).",
  example: "2023-01-01T00:00:00Z",
  placeholder: "Enter date and time",
});

export const folderId = input({
  label: "Folder ID",
  type: "string",
  required: true,
  clean: validateId,
  comments:
    "The unique identifier for the folder. Folders can contain sheets, sights, reports, templates, and other folders.",
  example: "375893453",
  placeholder: "Enter folder ID",
  dataSource: "selectFolder",
});

export const groupId = input({
  label: "Group ID",
  type: "string",
  required: true,
  clean: validateId,
  comments: "The unique identifier for the group.",
  example: "375893453",
  placeholder: "Enter group ID",
  dataSource: "selectGroup",
});

export const sheetId = input({
  label: "Sheet ID",
  type: "string",
  required: true,
  clean: validateId,
  comments: "The unique identifier for the sheet.",
  example: "4583173393803140",
  placeholder: "Enter sheet ID",
  dataSource: "selectSheet",
});

export const sheetIdOptional = input({
  label: "Sheet ID (Optional)",
  type: "string",
  required: false,
  clean: (value) => validateId(value, false),
  comments:
    "The unique identifier for the sheet. Leave empty to apply to all sheets.",
  example: "4583173393803140",
  placeholder: "Enter sheet ID (optional)",
});

export const columnId = input({
  label: "Column ID",
  type: "string",
  required: true,
  clean: validateId,
  comments: "The unique identifier for the column.",
  example: "7960873114331012",
  placeholder: "Enter column ID",
  dataSource: "selectColumn",
});

export const workspaceId = input({
  label: "Workspace ID",
  type: "string",
  required: true,
  clean: validateId,
  comments: "The unique identifier for the workspace.",
  example: "843750385",
  placeholder: "Enter workspace ID",
  dataSource: "selectWorkspace",
});

export const workspaceIdOptional = input({
  label: "Workspace ID (Optional)",
  type: "string",
  required: false,
  clean: (value) => validateId(value, false),
  comments:
    "The unique identifier for the workspace. Leave empty to use the default context.",
  example: "843750385",
  placeholder: "Enter workspace ID (optional)",
});

export const discussionId = input({
  label: "Discussion ID",
  type: "string",
  required: true,
  clean: validateId,
  comments: "The unique identifier for the discussion.",
  example: "3650061106619268",
  placeholder: "Enter discussion ID",
  dataSource: "selectDiscussion",
});

export const reportId = input({
  label: "Report ID",
  type: "string",
  required: true,
  clean: validateId,
  comments: "The unique identifier for the report.",
  example: "2973569197942660",
  placeholder: "Enter report ID",
  dataSource: "selectReport",
});

export const attachmentId = input({
  label: "Attachment ID",
  type: "string",
  required: true,
  clean: validateId,
  comments: "The unique identifier for the attachment.",
  example: "1018169196216196",
  placeholder: "Enter attachment ID",
  dataSource: "selectAttachment",
});

export const rowId = input({
  label: "Row ID",
  type: "string",
  required: true,
  clean: validateId,
  comments: "The unique identifier for the row.",
  example: "8908091207493508",
  placeholder: "Enter row ID",
  dataSource: "selectRow",
});

export const rowIdOptional = input({
  label: "Row ID (Optional)",
  type: "string",
  required: false,
  clean: (value) => validateId(value, false),
  comments:
    "The unique identifier for the row. Leave empty to apply to the sheet level.",
  example: "8908091207493508",
  placeholder: "Enter row ID (optional)",
});

export const webhookId = input({
  label: "Webhook ID",
  type: "string",
  required: true,
  clean: validateId,
  comments: "The unique identifier for the webhook.",
  example: "8444254503626628",
  placeholder: "Enter webhook ID",
  dataSource: "selectWebhook",
});


export const attachmentType = input({
  label: "Attachment Type",
  type: "string",
  required: false,
  model: [
    { label: "BOX COM", value: "BOX_COM" },
    { label: "DROPBOX", value: "DROPBOX*" },
    { label: "EGNYTE", value: "EGNYTE*" },
    { label: "EVERNOTE", value: "EVERNOTE*" },
    { label: "FILE", value: "FILE" },
    { label: "GOOGLE DRIVE", value: "GOOGLE_DRIVE" },
    { label: "LINK", value: "LINK" },
    { label: "ONEDRIVE", value: "ONEDRIVE" },
  ],
  clean: (value) => util.types.toString(value) || undefined,
  comments: "The storage provider or link type for the attachment.",
});
