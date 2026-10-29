import { input, util } from "@prismatic-io/spectral";
import { connectionInput, sheetId, validateId, webhookId } from "./common";

const callbackUrl = input({
  label: "Callback URL",
  type: "string",
  required: true,
  clean: util.types.toString,
  comments:
    "The URL that Smartsheet sends webhook notifications to. This is usually a reference to another flow's webhook URL.",
  example: "https://hooks.example.com/trigger/abc123",
  placeholder: "Enter callback URL",
});

const webhookName = input({
  label: "Webhook Name",
  type: "string",
  required: true,
  clean: util.types.toString,
  comments: "A descriptive label to identify the webhook in the dashboard.",
  placeholder: "Enter webhook name",
});

const subscopeColumnIds = input({
  label: "Subscope Column IDs",
  type: "string",
  required: false,
  collection: "valuelist",
  example: "7960873114331012",
  clean: (values) => {
    const arr = (values as string[]) || [];
    const nonEmpty = arr.filter(
      (v) => v !== undefined && v !== null && v !== "",
    );
    return nonEmpty.length === 0
      ? undefined
      : nonEmpty.map((value) => validateId(value));
  },
  comments:
    "When provided, the webhook only fires when these specific columns are modified. Leave empty to trigger on any change to the sheet. Use the List Columns action to find column IDs for a sheet.",
  placeholder: "Enter column ID",
});

const allowDuplicates = input({
  label: "Allow Duplicates",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "When true, allows the creation of duplicate webhooks. By default the action checks if a webhook with this callback and sheet ID already exists and skips creation if one is found.",
  clean: util.types.toBool,
});

const showAll = input({
  label: "Show All",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "When true, returns all webhooks for the account (including those for other apps and instances). When false, returns only webhooks whose callback URLs match a flow in the current instance.",
  clean: util.types.toBool,
});

export const createWebhookInputs = {
  connection: connectionInput,
  callbackUrl,
  name: webhookName,
  scopeObjectId: sheetId,
  subscopeColumnIds,
  allowDuplicates,
};

export const deleteInstanceWebhooksInputs = {
  connection: connectionInput,
};

export const deleteWebhookInputs = {
  connection: connectionInput,
  webhookId,
};

export const getWebhookInputs = {
  connection: connectionInput,
  webhookId,
};

export const listWebhooksInputs = {
  connection: connectionInput,
  showAll,
};
