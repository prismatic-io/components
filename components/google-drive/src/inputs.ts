import { input, util } from "@prismatic-io/spectral";
import { cleanArrayInput, cleanItemInput, cleanStringInput } from "./util";
import { MY_DRIVE } from "./constants";

export const connection = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The Connection to use for Google Drive authorization.",
});

export const fileId = input({
  label: "File ID",
  placeholder: "Enter File ID",
  type: "string",
  required: true,
  example: "1a2b3c4d5e6f7g8h9i0j",
  clean: util.types.toString,
  comments:
    "A unique opaque ID for each file. File IDs are stable throughout the life of the file, even if the file name changes.",
  dataSource: "selectFiles",
});

export const fileName = input({
  label: "File Name",
  placeholder: "Enter file name",
  type: "string",
  required: false,
  example: "My Document.pdf",
  comments: "The name of the file.",
});

export const folderName = input({
  label: "Folder Name",
  placeholder: "Enter folder name",
  type: "string",
  required: true,
  example: "Pictures",
  comments: "The name of the folder.",
});

export const fileContent = input({
  label: "File Content",
  placeholder: "Enter file content",
  type: "string",
  required: true,
  example: "My Example File Contents",
  comments:
    "The binary or text body of the file. Some content examples you can store in Google Drive are images, videos, text, and PDF.",
});

export const folderId = input({
  label: "Folder ID",
  placeholder: "Enter Folder ID",
  type: "string",
  required: false,
  example: "1xYz2AbC3DeF4GhI5JkL",
  comments: "A unique opaque ID for each folder.",
  dataSource: "selectFolder",
});

export const pageSize = input({
  label: "Page Size",
  type: "string",
  required: false,
  placeholder: "Enter page size (1-50)",
  comments: "The maximum number of results to return. Must be between 1 and 50.",
  example: "20",
  default: "20",
  clean: (value: unknown) => util.types.toInt(value, 20),
});

export const fields = input({
  label: "Fields",
  type: "string",
  required: false,
  default: "*",
  placeholder: "Enter fields to return",
  comments:
    "Fields to return in the response. For list operations, wrap field names in files(), e.g., files(id,name,mimeType). If unspecified, returns all fields. See [Google's fields parameter documentation](https://developers.google.com/drive/api/guides/fields-parameter).",
  example: "files(id,name,mimeType,size,modifiedTime)",
  clean: util.types.toString,
});

export const query = input({
  label: "Query",
  type: "string",
  required: false,
  placeholder: "Enter query string",
  comments:
    "A query string to filter results. See [Google's documentation](https://developers.google.com/drive/api/v3/search-files) for query syntax.",
  example: "name contains 'report'",
});

export const pageToken = input({
  label: "Page Token",
  type: "string",
  required: false,
  comments:
    "Specify the pagination token that's returned by a previous request to retrieve the next page of results",
  example: "lslTXFcbLQKkb0vP9Kgh5hy0Y0OnC7Z9ZPHPwPmMnxSk3eiDRMkct7D8E",
  placeholder: "Enter page token",
  clean: util.types.toString,
});

export const searchQuery = input({
  label: "Search",
  type: "string",
  required: false,
  placeholder: "Enter search terms",
  comments: "Search terms to filter results.",
  example: "quarterly report 2024",
  clean: util.types.toString,
});

export const filesContainingSearchQuery = input({
  label: "Files Containing Search Query",
  type: "boolean",
  required: false,
  comments: "When true, searches for files that contain the provided search query in their name.",
  clean: util.types.toBool,
  default: "false",
});

export const exportType = input({
  label: "Preferred Export Type",
  type: "string",
  required: false,
  placeholder: "Enter MIME type",
  comments:
    "The MIME type to export the file as. If not compatible, the first available export type will be used. Only required for non-binary files.",
  example: "application/pdf",
});

export const driveId = input({
  label: "Drive ID",
  type: "string",
  required: false,
  placeholder: "Enter Drive ID",
  comments: `The ID of a shared drive to search for the file in. If not provided, the search will be performed across all drives. Enter '${MY_DRIVE}' to search only "My Drive".`,
  clean: (value) => util.types.toString(value) || undefined,
  example: "0AAvGyortvuqEXAMPLE",
  dataSource: "selectDrive",
});

export const webhookExpirationInput = input({
  type: "string",
  label: "Expiration Time",
  required: false,
  placeholder: "Enter UNIX timestamp in milliseconds",
  comments:
    "The time at which the webhook will expire as a UNIX timestamp in milliseconds. Defaults to 1 hour from now, and can be set to a maximum of 1 day from now.",
  clean: (value) => util.types.toString(value) || undefined,
  example: "1426325213000",
});

export const webhookEndpointInput = input({
  type: "string",
  label: "Endpoint",
  comments: "The URL where webhook notifications will be sent.",
  required: true,
  placeholder: "Enter webhook URL",
  example: "https://your-webhook-endpoint.com/webhook/abc123",
  clean: util.types.toString,
});

export const metadataFields = input({
  label: "Fields",
  type: "string",
  required: true,
  comments: "A comma separated list of fields to return in the response.",
  example: "id,name,mimeType,thumbnailLink",
  placeholder: "Enter comma separated fields",
  clean: util.types.toString,
});

export const consolidationStrategy = input({
  label: "Consolidation Strategy",
  type: "string",
  required: false,
  placeholder: "Select consolidation strategy",
  comments:
    "Details on how to consolidate related actions that make up the activity. If not set, then related actions aren't consolidated.",
  model: [
    { value: "none", label: "None" },
    { value: "legacy", label: "Legacy" },
  ],
  clean: (value: unknown) => {
    if (value) {
      return {
        [util.types.toString(value)]: {},
      };
    }
    return {};
  },
});

export const filter = input({
  label: "Filter",
  type: "string",
  required: false,
  comments: "The filtering for items returned from this query request.",
  example: "time > 1452409200000 AND time <= 1492812924310",
  placeholder: "Enter filter expression",
  clean: cleanStringInput,
});

export const itemName = input({
  label: "File ID",
  type: "string",
  required: false,
  comments: "Return activities for this Drive item.",
  example: "1a2b3c4d5e6f7g8h9i0j",
  placeholder: "Enter File ID",
  dataSource: "selectFiles",
  clean: cleanItemInput,
});

export const ancestorName = input({
  label: "Folder or Drive ID",
  type: "string",
  required: false,
  comments: "Return activities for this Drive or folder, plus all children and descendants.",
  example: "0ALiN8fRST0gxUk9PVA",
  placeholder: "Enter Folder or Drive ID",
  dataSource: "selectFolder",
  clean: cleanItemInput,
});

export const triggerEvents = input({
  label: "Trigger Events",
  type: "string",
  placeholder: "Select event types",
  comments: "The event types the trigger will poll.",
  collection: "valuelist",
  model: [
    { value: "CREATE", label: "Create" },
    { value: "COMMENT", label: "Comment" },
    { value: "DELETE", label: "Delete" },
    { value: "EDIT", label: "Update" },
    { value: "MOVE", label: "Move" },
    { value: "REFERENCE", label: "Reference" },
    { value: "RENAME", label: "Rename" },
    { value: "RESTORE", label: "Restore" },
  ],
  required: false,
  clean: cleanArrayInput,
});

export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  required: false,
  clean: util.types.toBool,
  default: "false",
  comments: "When true, fetches all pages of results using pagination.",
});
