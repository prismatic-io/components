import { input, util } from "@prismatic-io/spectral";
import { cleanCommaSeparatedString, humanizeEnumLabel } from "./utils";
import { WebhookTriggerType } from "./interfaces";

export const path = input({
  label: "Path",
  placeholder: "Enter file or folder path",
  type: "string",
  required: true,
  comments:
    "The full path to the file or folder. Must include a leading forward slash (/).",
  example: "/Marketing/Documents/Q4_Report.pdf",
});

export const fromPath = input({
  label: "From Path",
  placeholder: "Enter source path",
  type: "string",
  required: true,
  comments:
    "The full path to the source file or folder. Must include a leading forward slash (/).",
  example: "/Marketing/Documents/OldReport.pdf",
});

export const toPath = input({
  label: "To Path",
  placeholder: "Enter destination path",
  type: "string",
  required: true,
  comments:
    "The full path to the destination location including the new filename. Must include a leading forward slash (/).",
  example: "/Archive/2024/OldReport.pdf",
});

export const fileContents = input({
  label: "File Contents",
  placeholder: "Select file data from previous step",
  type: "data",
  required: true,
  comments:
    "The file content to upload. Accepts text, binary data (images, PDFs), or output from a previous step.",
  example: "My File Contents",
});

export const limit = input({
  label: "Limit",
  type: "string",
  required: false,
  placeholder: "Enter maximum number of items",
  comments: "The maximum number of items to return (1-1000).",
  example: "100",
  clean: util.types.toNumber,
});

export const marker = input({
  label: "Marker",
  type: "string",
  required: false,
  placeholder: "Enter pagination marker",
  comments:
    "The pagination marker returned by a previous request to retrieve the next page of results.",
  example: "lslTXFcbLQKkb0vP9Kgh5hy0Y0OnC7Z9ZPHPwPmMnxSk3eiDRMkct7D8E",
  clean: util.types.toString,
});

export const offset = input({
  label: "Offset",
  type: "string",
  required: false,
  placeholder: "Enter offset position",
  comments: "The position to start returning results from (zero-based index).",
  example: "0",
  clean: util.types.toNumber,
});

export const address = input({
  label: "Webhook URL",
  placeholder: "Enter webhook URL",
  comments:
    "The URL where webhook events will be sent. Reference a flow's URL from the trigger payload.",
  type: "string",
  required: true,
  example: "https://hooks.example.com/box/abc123",
  clean: util.types.toString,
});

export const webhookId = input({
  label: "Webhook ID",
  placeholder: "Enter webhook ID",
  comments: "The unique identifier of the webhook.",
  type: "string",
  example: "375893453",
  required: true,
  dataSource: "selectWebhook",
  clean: util.types.toString,
});

export const targetId = input({
  label: "Target ID",
  placeholder: "Enter target file or folder ID",
  comments:
    "The unique identifier of the file or folder that will trigger the webhook.",
  type: "string",
  example: "123456789012",
  required: true,
  dataSource: "selectContent",
  clean: util.types.toString,
});

export const targetType = input({
  label: "Target Type",
  placeholder: "Select target type",
  comments: "The type of item that will trigger the webhook (file or folder).",
  type: "string",
  example: "file",
  model: [
    { label: "File", value: "file" },
    { label: "Folder", value: "folder" },
  ],
  required: true,
  clean: (value) => {
    const strValue = util.types.toString(value);
    if (["file", "folder"].includes(strValue)) {
      return strValue;
    }
    throw new Error(`Invalid target type specified: ${value}`);
  },
});

export const triggerTypes = input({
  label: "Trigger Type",
  placeholder: "Select event types",
  comments:
    "Select which event types will trigger this webhook. See [Box Events](https://developer.box.com/guides/webhooks/triggers) for available options.",
  type: "string",
  required: true,
  collection: "valuelist",
  model: Object.values(WebhookTriggerType).map((value) => ({
    label: humanizeEnumLabel(value),
    value: value,
  })),
  clean: (values) =>
    ((values as string[]) || []).map((value) => util.types.toString(value)),
});

export const signatureKey = input({
  label: "Signature Key",
  placeholder: "Enter signature key",
  comments:
    "A signature key used to validate webhook requests. See [Box Webhook Signatures](https://developer.box.com/guides/webhooks/handle/verify-signatures/) for details.",
  type: "password",
  example: "3T2eTfOvJbAIRoBpXsXPmq0gn8CmF5Q7",
  required: false,
  clean: util.types.toString,
});

export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The Box connection to use.",
});

export const sharedLinkInput = input({
  label: "Shared Link",
  placeholder: "Enter shared link URL",
  type: "string",
  required: true,
  comments: "The URL of the shared link.",
  example: "https://app.box.com/s/abcd1234efgh5678ijkl",
  clean: util.types.toString,
});

export const fileIdInput = input({
  label: "File ID",
  placeholder: "Enter file ID",
  type: "string",
  required: true,
  comments: "The unique identifier of the file.",
  example: "987654321012",
  dataSource: "selectContent",
  clean: util.types.toString,
});

export const sharedLinkPasswordInput = input({
  label: "Shared Link Password",
  placeholder: "Enter shared link password",
  type: "password",
  required: false,
  comments: "The password for the shared link, if one is set.",
  clean: util.types.toString,
});

export const fieldsInput = input({
  label: "Fields",
  placeholder: "Enter comma-separated field names",
  type: "string",
  required: false,
  comments:
    "A comma-separated list of attributes to include in the response. See [Box File Fields](https://developer.box.com/reference/resources/file/) for available options.",
  example: "type,id,name,size,created_at",
  clean: util.types.toString,
});

export const sharedLinkAccessInput = input({
  label: "Shared Link Access",
  placeholder: "Enter access level",
  type: "string",
  required: true,
  comments:
    "The level of access for the shared link. Values: open, company, collaborators. See [Box Shared Links](https://developer.box.com/guides/shared-links/) for details.",
  example: "open",
  clean: util.types.toString,
});

export const sharedLinkPermissionsInput = input({
  label: "Shared Link Permissions",
  type: "code",
  language: "json",
  default: JSON.stringify(
    {
      can_download: true,
      can_edit: true,
      can_preview: true,
    },
    null,
    2,
  ),
  required: false,
  comments:
    "The permissions for the shared link (file). Specify which actions are allowed. See [Box Shared Link Permissions](https://developer.box.com/reference/put-files-id/#request-body) for details.",
  clean: util.types.toObject,
});

export const sharedLinkPermissionsFolderInput = input({
  label: "Shared Link Permissions Folder",
  type: "code",
  language: "json",
  default: JSON.stringify(
    {
      can_download: true,
      can_preview: true,
    },
    null,
    2,
  ),
  required: false,
  comments:
    "The permissions for the shared link (folder). Specify which actions are allowed. See [Box Shared Link Permissions](https://developer.box.com/reference/put-folders-id/#request-body) for details.",
  clean: (permissionsInput) => {
    return util.types.isJSON(util.types.toString(permissionsInput))
      ? JSON.parse(util.types.toString(permissionsInput))
      : permissionsInput;
  },
});

export const sharedLinkUnsharedAtInput = input({
  label: "Shared Link Unshared At",
  placeholder: "Enter expiration timestamp (ISO 8601)",
  type: "string",
  required: false,
  comments:
    "The timestamp when the shared link will expire in ISO 8601 format (YYYY-MM-DDTHH:MM:SSZ).",
  example: "2026-12-31T23:59:59Z",
  clean: util.types.toString,
});

export const sharedLinkVanityNameInput = input({
  label: "Shared Link Vanity Name",
  placeholder: "Enter custom vanity name",
  type: "string",
  required: false,
  comments:
    "The custom vanity name for the shared link URL. Creates a URL like https://app.box.com/v/your-vanity-name.",
  example: "q4-financial-report",
  clean: util.types.toString,
});

export const folderIdInput = input({
  label: "Folder ID",
  placeholder: "Enter folder ID",
  type: "string",
  required: true,
  comments: "The unique identifier of the folder.",
  example: "123456789012",
  dataSource: "selectContent",
  clean: util.types.toString,
});

export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  required: false,
  comments: "When true, retrieves all results using automatic pagination.",
  clean: util.types.toBool,
});

export const fields = input({
  label: "Fields/Metadata",
  type: "string",
  required: false,
  placeholder: "Enter comma-separated field names",
  comments:
    "Comma-separated attributes to include in the response. Supports metadata queries (e.g., metadata.enterprise_12345.contractTemplate). See [Box File Fields](https://developer.box.com/reference/resources/file--full) for available options.",
  example: "content_created_at,name,size,modified_at",
  clean: cleanCommaSeparatedString,
});

export const contentType = input({
  label: "Content Type",
  placeholder: "Select content type",
  comments: "The type of content to select (files, folders, or both).",
  type: "string",
  example: "file",
  model: [
    { label: "Files and Folders", value: "all" },
    { label: "Files", value: "file" },
    { label: "Folders", value: "folder" },
  ],
  default: "all",
  required: true,
  clean: util.types.toString,
});
