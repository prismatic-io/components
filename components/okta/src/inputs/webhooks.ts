import { input, util } from "@prismatic-io/spectral";
import { cleanObject, cleanString } from "../util/clean";
import { EVENT_LIST_MODEL } from "../util/constants";
import { cleanStringArray } from "../util/util";
import { connection, filter } from "./general";

export const eventHookId = input({
  label: "Event Hook ID",
  type: "string",
  comments: "The ID of the event hook.",
  example: "who8zne7Y5lQr9Yi80g4",
  placeholder: "Enter Event Hook ID",
  dataSource: "selectEventHook",
  required: true,
  clean: util.types.toString,
});

export const eventHookName = input({
  label: "Event Hook Name",
  type: "string",
  comments: "The name of the event hook.",
  example: "My Event Hook",
  placeholder: "Enter the name of the event hook",
  required: true,
  clean: util.types.toString,
});

export const eventHookUrl = input({
  label: "Event Hook URL",
  type: "string",
  comments: "The URL of the event hook.",
  example: "https://example.com/webhook",
  placeholder: "Enter the URL of the event hook",
  required: true,
  clean: util.types.toString,
});

export const eventHookUrlHeaders = input({
  label: "Event Hook URL Headers",
  type: "string",
  collection: "keyvaluelist",
  comments: "Optional headers to include in the webhook request.",
  example: '{ "X-Custom-Header": "value" }',
  placeholder: '{ "X-Custom-Header": "value" }',
  required: false,
  clean: (value: unknown) => {
    return Array.isArray(value) && value.length > 0 ? value : undefined;
  },
});

export const eventHookItems = input({
  label: "Event Hook Items",
  type: "string",
  collection: "valuelist",
  comments: "The list of event types to subscribe to.",
  model: EVENT_LIST_MODEL,
  required: false,
  clean: cleanStringArray,
});

export const eventHookItemsCode = input({
  label: "Dynamic Event Hook Items",
  type: "code",
  language: "json",
  comments: "The list of event types to subscribe to in code format.",
  example: JSON.stringify(["user.lifecycle.create", "user.lifecycle.activate"], null, 2),
  required: false,
  clean: cleanObject,
});

export const eventHookFilter = input({
  label: "Event Hook Filters",
  type: "code",
  language: "json",
  comments: "The optional filter defined on a specific event type.",
  example: JSON.stringify(
    {
      type: "EXPRESSION_LANGUAGE",
      eventFilterMap: [],
    },
    null,
    2,
  ),
  required: false,
  clean: cleanObject,
});

export const eventHookDescription = input({
  label: "Event Hook Description",
  type: "string",
  comments: "The description of the event hook.",
  example: "This is my event hook.",
  placeholder: "Enter the description of the event hook",
  required: false,
  clean: cleanString,
});

export const doNotActivateOnCreate = input({
  label: "Do Not Activate on Create",
  type: "boolean",
  comments:
    "When true, the event hook will not be activated and a verification request will not be sent.",
  required: false,
  clean: util.types.toBool,
});

export const listEventHooksInputs = {
  connection,
};

export const getEventHookInputs = {
  eventHookId,
  connection,
};

export const activateEventHookInputs = getEventHookInputs;

export const deactivateEventHookInputs = getEventHookInputs;

export const verifyEventHookInputs = getEventHookInputs;

export const deleteEventHookInputs = getEventHookInputs;

export const createEventHookInputs = {
  eventHookName,
  eventHookUrl,
  doNotActivateOnCreate,
  eventHookItems,
  eventHookItemsCode,
  eventHookUrlHeaders,
  eventHookFilter,
  eventHookDescription,
  connection,
};

export const deleteAllEventHooksInputs = {
  eventHookUrl: {
    ...eventHookUrl,
    required: false,
    comments:
      "If provided, only event hooks with this URL will be deleted. If not provided, all event hooks will be deleted.",
  },
  connection,
};

export const triggerEventHookInputs = {
  eventHookItems,
  eventHookItemsCode,
  eventHookUrlHeaders,
  eventHookFilter,
  connection,
};

export const newUsersPollingTriggerInputs = {
  connection,
};

export const updatedUsersPollingTriggerInputs = {
  connection,
};

export const newSystemLogsPollingTriggerInputs = {
  filter,
  connection,
};
