import { input, util } from "@prismatic-io/spectral";
import { toOptionalObject } from "../util";
import { boardId, connectionInput } from "./common";

const webhookId = input({
  label: "Webhook ID",
  type: "string",
  required: true,
  comments: "The unique identifier of the Monday.com webhook.",
  placeholder: "Enter Webhook ID",
  example: "123456789",
  dataSource: "selectWebhook",
  clean: util.types.toInt,
});

const webhookUrl = input({
  label: "Webhook URL",
  type: "string",
  required: true,
  comments:
    "The URL to receive webhook events. Must be a publicly accessible HTTPS endpoint (255 character limit).",
  placeholder: "Enter webhook URL",
  example: "https://hooks.example.com/monday/events",
  clean: util.types.toString,
});

export const webhookEvent = input({
  label: "Event",
  type: "string",
  required: true,
  model: [
    { label: "Change Column Value", value: "change_column_value" },
    {
      label: "Change Status Column Value",
      value: "change_status_column_value",
    },
    {
      label: "Change Subitem Column Value",
      value: "change_subitem_column_value",
    },
    {
      label: "Change Specific Column Value",
      value: "change_specific_column_value",
    },
    { label: "Change Name", value: "change_name" },
    { label: "Create Item", value: "create_item" },
    { label: "Item Archived", value: "item_archived" },
    { label: "Item Deleted", value: "item_deleted" },
    { label: "Item Moved to Any Group", value: "item_moved_to_any_group" },
    {
      label: "Item Moved to Specific Group",
      value: "item_moved_to_specific_group",
    },
    { label: "Item Restored", value: "item_restored" },
    { label: "Create Subitem", value: "create_subitem" },
    { label: "Change Subitem Name", value: "change_subitem_name" },
    { label: "Move Subitem", value: "move_subitem" },
    { label: "Subitem Archived", value: "subitem_archived" },
    { label: "Subitem Deleted", value: "subitem_deleted" },
    { label: "Create Column", value: "create_column" },
    { label: "Create Update", value: "create_update" },
    { label: "Edit Update", value: "edit_update" },
    { label: "Delete Update", value: "delete_update" },
    { label: "Create Subitem Update", value: "create_subitem_update" },
  ],
  comments: "The type of board event to subscribe to.",
  placeholder: "Select event type",
  clean: util.types.toString,
});

export const webhookConfig = input({
  label: "Config",
  type: "code",
  language: "json",
  required: false,
  comments:
    'Optional event-specific configuration as a JSON object. For example, {"columnId": "status"} for change_specific_column_value events.',
  placeholder: "Enter webhook config",
  example: JSON.stringify({ columnId: "status" }, null, 2),
  clean: toOptionalObject,
});

export const createWebhookInputs = {
  connection: connectionInput,
  boardId,
  webhookUrl,
  webhookEvent,
  webhookConfig,
};

export const deleteWebhookInputs = {
  connection: connectionInput,
  boardId,
  webhookId,
};

export const listWebhooksInputs = {
  connection: connectionInput,
  boardId,
};

export const selectWebhookInputs = {
  connection: connectionInput,
  boardId: {
    ...boardId,
    dataSource: undefined,
  },
};
