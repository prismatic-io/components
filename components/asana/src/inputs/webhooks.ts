import { input, util } from "@prismatic-io/spectral";
import { validateId } from "../util";
import { connectionInput, pagination, workspaceId } from "./common";
const filter = input({
  label: "Filter",
  type: "code",
  language: "json",
  default: JSON.stringify(
    [
      {
        action: "changed",
        fields: ["due_at", "due_on", "dependencies"],
        resource_subtype: "milestone",
        resource_type: "task",
      },
    ],
    null,
    2,
  ),
  required: false,
  comments:
    "The filter parameters for the webhook expressed as a JSON array. See the [Asana webhooks guide](https://developers.asana.com/docs/webhooks-guide) for available filter options.",
  clean: (filterInput: unknown) => {
    if (filterInput !== "") {
      const value = util.types.toString(filterInput);
      if (!util.types.isJSON(value)) {
        throw new Error("Invalid JSON provided for Filter.");
      }
      return JSON.parse(value);
    }
    return undefined;
  },
});
const endpoint = input({
  label: "Webhook URL",
  comments: "Reference a flow's URL from the trigger payload.",
  type: "string",
  example: "https://hooks.site.io/trigger/example",
  placeholder: "Enter webhook URL",
  required: true,
  clean: util.types.toString,
});
const webhookResourceId = input({
  label: "Resource ID",
  comments:
    "The GID of a project, portfolio, goal, task, etc - the resource to listen for.",
  type: "string",
  example: "375893453",
  placeholder: "Enter resource ID",
  required: true,
  clean: validateId,
});
const webhookId = input({
  label: "Webhook ID",
  type: "string",
  example: "375893453",
  comments: "The gid of the workspace",
  required: true,
  clean: validateId,
});
const showOnlyInstanceWebhooks = input({
  label: "Show only instance webhooks",
  comments: "Show only webhooks that point to this instance",
  type: "boolean",
  default: "true",
  clean: util.types.toBool,
});
export const createWebhookInputs = {
  endpoint,
  resourceId: webhookResourceId,
  filter,
  asanaConnection: connectionInput,
};
export const deleteWebhookInputs = {
  asanaConnection: connectionInput,
  webhookId,
};
export const listWebhooksInputs = {
  asanaConnection: connectionInput,
  workspaceId,
  showOnlyInstanceWebhooks,
  pagination,
};
export const deleteInstanceWebhooksInputs = {
  asanaConnection: connectionInput,
  workspaceId,
};
