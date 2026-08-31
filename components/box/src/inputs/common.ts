import { input, util } from "@prismatic-io/spectral";
import { WEBHOOK_TRIGGER_TYPES } from "../types";
import { humanizeEnumLabel, toStringList } from "../util";
export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The Box connection to use.",
});
export const path = input({
  label: "Path",
  placeholder: "Enter file or folder path",
  type: "string",
  required: true,
  comments:
    "The full path to the file or folder. Must include a leading forward slash (/).",
  example: "/Marketing/Documents/Q4_Report.pdf",
  clean: util.types.toString,
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
export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "When true, automatically fetches all pages of results using pagination.",
  clean: util.types.toBool,
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
  clean: util.types.toString,
});
export const triggerTypes = input({
  label: "Trigger Type",
  placeholder: "Select event types",
  comments:
    "Select which event types will trigger this webhook. See [Box Events](https://developer.box.com/guides/webhooks/triggers) for available options.",
  type: "string",
  required: true,
  collection: "valuelist",
  model: WEBHOOK_TRIGGER_TYPES.map((value) => ({
    label: humanizeEnumLabel(value),
    value: value,
  })),
  clean: toStringList,
});
export const signatureKey = input({
  label: "Signature Key",
  placeholder: "Enter signature key",
  comments:
    "A signature key used to validate webhook requests. See [Box Webhook Signatures](https://developer.box.com/guides/webhooks/v2/signatures-v2) for details.",
  type: "password",
  example: "3T2eTfOvJbAIRoBpXsXPmq0gn8CmF5Q7",
  required: false,
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
