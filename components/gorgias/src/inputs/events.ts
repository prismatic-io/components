import { input, util } from "@prismatic-io/spectral";
import { TYPE_MODEL } from "../constants";
import { cleanCodeInput } from "../utils/cleanCode";
import { cleanValueListInput } from "../utils/cleanValueListInput";
import { toInt } from "../utils/toInt";
import { toStr } from "../utils/toStr";
import { validateLimit } from "../utils/validateLimit";
import { sharedInputs } from "./shared";

export const getEventInputs = {
  id: input({
    label: "Event ID",
    comments: "The ID of the event to retrieve.",
    type: "string",
    required: true,
    example: "5190131059",
    placeholder: "5190131059",
    clean: toInt,
  }),
  ...sharedInputs,
};

export const listEventsInputs = {
  
  created_datetime: input({
    label: "Created Datetime",
    comments:
      "Comparators used to filter events on their creation date. See [Gorgias API documentation](https://developers.gorgias.com/reference/list-events) for more information.",
    type: "code",
    language: "json",
    required: false,
    example: JSON.stringify(
      {
        lt: "date-time",
        lte: "date-time",
        gt: "date-time",
        gte: "date-time",
      },
      null,
      2,
    ),
    clean: (value: unknown) => cleanCodeInput(value, "Created Datetime"),
  }),
  object_id: input({
    label: "Object ID",
    comments: "ID of the object associated with the events to return.",
    type: "string",
    example: "5190131059",
    placeholder: "5190131059",
    required: false,
    clean: toInt,
  }),
  object_type: input({
    label: "Object Type",
    comments: "Type of the object associated with the events to return.",
    type: "string",
    required: false,
    clean: toStr,
    model: [
      { value: "Account", label: "Account" },
      { value: "Macro", label: "Macro" },
      { value: "Tag", label: "Tag" },
      { value: "Customer", label: "Customer" },
      { value: "Team", label: "Team" },
      { value: "View", label: "View" },
      { value: "Widget", label: "Widget" },
      { value: "User", label: "User" },
      { value: "TicketMessage", label: "TicketMessage" },
      { value: "Ticket", label: "Ticket" },
      { value: "Rule", label: "Rule" },
      { value: "Integration", label: "Integration" },
    ],
    example: "Customer",
    placeholder: "Customer",
  }),
  types: input({
    label: "Types",
    comments: "Types of the events to return.",
    type: "string",
    collection: "valuelist",
    model: TYPE_MODEL,
    example: "account-created",
    placeholder: "account-created",
    required: false,
    clean: cleanValueListInput,
  }),
  user_ids: input({
    label: "User IDs",
    comments: "IDs of the users who triggered the events to return.",
    type: "string",
    collection: "valuelist",
    example: "5190131059",
    placeholder: "5190131059",
    required: false,
    clean: cleanValueListInput,
  }),
  fetchAll: input({
    label: "Fetch All",
    comments:
      "When enabled, all events will be fetched. This can be slow if you have a lot of events. Cursor and limit will be ignored.",
    type: "boolean",
    required: false,
    default: "false",
    clean: util.types.toBool,
  }),
  cursor: input({
    label: "Cursor",
    comments:
      "Value indicating your position in the list of all events. If omitted, the first events of the list will be returned.",
    type: "string",
    required: false,
    clean: toStr,
    placeholder: "cHJldl9fNl9fMjAyMS0wMy0wMyAwNjowMDowMA==",
    example: "cHJldl9fNl9fMjAyMS0wMy0wMyAwNjowMDowMA==",
  }),
  limit: input({
    label: "Limit",
    comments:
      "Maximum number of customers to return. The max number allowed is 100.",
    type: "string",
    required: false,
    clean: validateLimit,
    placeholder: "30",
    example: "30",
  }),
  order_by: input({
    label: "Order By",
    comments: "Attribute used to order events.",
    type: "string",
    required: false,
    clean: toStr,
    placeholder: "created_datetime:desc",
    example: "created_datetime:desc",
    model: [
      {
        value: "created_datetime:desc",
        label: "Created Date (Descending)",
      },
      {
        value: "created_datetime:asc",
        label: "Created Date (Ascending)",
      },
    ],
  }),
  ...sharedInputs,
};

export const selectEventInputs = {
  created_datetime: listEventsInputs.created_datetime,
  object_id: listEventsInputs.object_id,
  object_type: listEventsInputs.object_type,
  types: listEventsInputs.types,
  user_ids: listEventsInputs.user_ids,
  connection: sharedInputs.connection,
};
