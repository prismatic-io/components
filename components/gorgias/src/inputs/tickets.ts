import { input, util } from "@prismatic-io/spectral";
import {
  ATTACHMENTS_EXAMPLE,
  BOOLEAN_MODEL,
  CHANNEL_MODEL,
  RECEIVER_EXAMPLE,
  SENDER_EXAMPLE,
  SOURCE_EXAMPLE,
  VIA_MODEL,
} from "../constants";
import { cleanArrayCodeInput, cleanCodeInput } from "../utils/cleanCode";
import { cleanKeyValueListInput } from "../utils/cleanKeyValueListInput";
import { cleanValueListInput } from "../utils/cleanValueListInput";
import { arrayObjectsStringMap } from "../utils/objectsNameMap";
import { toDate } from "../utils/toDate";
import { toInt } from "../utils/toInt";
import { toStr } from "../utils/toStr";
import { validateId } from "../utils/validateId";
import { validateLimit } from "../utils/validateLimit";
import { sharedInputs } from "./shared";

const id = input({
  label: "Ticket ID",
  comments: "The ID of the ticket.",
  type: "string",
  required: true,
  clean: toInt,
});

const assignee_team = input({
  label: "Assignee Team",
  comments: "The team assigned to the ticket.",
  type: "code",
  language: "json",
  required: false,
  example: JSON.stringify(
    {
      id: "number",
    },
    null,
    2,
  ),
  clean: (value: unknown) => cleanCodeInput(value, "Assignee Team"),
});

const assignee_user = input({
  label: "Assignee User",
  comments: "The user assigned to the ticket.",
  type: "code",
  language: "json",
  required: false,
  example: JSON.stringify(
    {
      id: "number",
    },
    null,
    2,
  ),
  clean: (value: unknown) => cleanCodeInput(value, "Assignee User"),
});

const channel = input({
  label: "Assignee User ID",
  comments: "The team assigned to the ticket.",
  type: "string",
  required: false,
  model: CHANNEL_MODEL,
  clean: toStr,
  placeholder: "email",
  example: "email",
});

const closed_datetime = input({
  label: "Closed Datetime",
  comments: "When the ticket was closed.",
  type: "string",
  required: false,
  clean: toDate,
  placeholder: "2020-01-27T10:42:21.468912",
  example: "2020-01-27T10:42:21.468912",
});

const created_datetime = input({
  label: "Created Datetime",
  comments: "When the ticket was created.",
  type: "string",
  required: false,
  clean: toDate,
  placeholder: "2020-01-27T10:42:21.468912",
  example: "2020-01-27T10:42:21.468912",
});

const customer = input({
  label: "Customer",
  comments: "The customer linked to the ticket.",
  type: "code",
  language: "json",
  required: false,
  example: JSON.stringify(
    {
      id: "number",
      email: "string | null",
    },
    null,
    2,
  ),
  clean: (value: unknown) => cleanCodeInput(value, "Customer"),
});

const external_id = input({
  label: "External ID",
  comments:
    "External ID of the ticket in a foreign system. This field is not used by Gorgias, feel free to set it as you wish.",
  type: "string",
  required: false,
  clean: toStr,
  placeholder: "RETURN#4213",
  example: "RETURN#4213",
});

const from_agent = input({
  label: "From Agent",
  comments:
    "Whether the first message of the ticket was sent by your company to a customer, or the opposite.",
  type: "string",
  required: false,
  model: BOOLEAN_MODEL,
  example: "true",
  placeholder: "true",
  clean: util.types.toBool,
});

const language = input({
  label: "Language",
  comments:
    "The language primarily used in the ticket. The language is automatically detected on the first messages by Gorgias if not set explicitly.Once the language has been set, it won't be updated according to future messages.",
  type: "string",
  required: false,
  clean: toStr,
  placeholder: "en",
  example: "en",
});

const last_message_datetime = input({
  label: "Last Message Datetime",
  comments: "When the last message was sent.",
  type: "string",
  required: false,
  clean: toDate,
  placeholder: "2020-01-27T10:42:21.468912",
  example: "2020-01-27T10:42:21.468912",
});

const last_received_message_datetime = input({
  label: "Last Received Message Datetime",
  comments: "When the last customer's message was sent.",
  type: "string",
  required: false,
  clean: toDate,
  placeholder: "2020-01-27T10:42:21.468912",
  example: "2020-01-27T10:42:21.468912",
});


const messages = input({
  label: "Messages",
  comments: "Messages of the ticket.",
  type: "code",
  language: "json",
  required: true,
  example: JSON.stringify([
    {
      attachments: ATTACHMENTS_EXAMPLE,
      body_html: "string | null",
      body_text: "string | null",
      channel: CHANNEL_MODEL.map((c) => c.value).join(" | "),
      created_datetime: "date-time | null",
      external_id: "string | null",
      failed_datetime: "date-time | null",
      from_agent: "boolean",
      last_sending_error: "null",
      message_id: "string | null",
      receiver: RECEIVER_EXAMPLE,
      sender: SENDER_EXAMPLE,
      sent_datetime: "date-time | null",
      source: SOURCE_EXAMPLE,
    },
  ]),
  clean: (value: unknown) => cleanArrayCodeInput(value, "Messages"),
});

const meta = input({
  label: "Meta",
  comments:
    "Data associated with the ticket. You can use this field to store structured information (key-value data) about the ticket.",
  type: "string",
  collection: "keyvaluelist",
  example: "key1:value1",
  placeholder: "key1:value1",
  required: false,
  clean: cleanKeyValueListInput,
});

const opened_datetime = input({
  label: "Opened Datetime",
  comments: "When the ticket was opened for the first time by a user.",
  type: "string",
  required: false,
  clean: toDate,
  placeholder: "2020-01-27T10:42:21.468912",
  example: "2020-01-27T10:42:21.468912",
});

const snooze_datetime = input({
  label: "Snooze Datetime",
  comments: "When the ticket will be re-opened.",
  type: "string",
  required: false,
  clean: toDate,
  placeholder: "2020-01-27T10:42:21.468912",
  example: "2020-01-27T10:42:21.468912",
});

const spam = input({
  label: "Spam",
  comments: "Whether the ticket is considered as spam or not.",
  type: "string",
  required: false,
  placeholder: "false",
  example: "false",
  model: BOOLEAN_MODEL,
  clean: util.types.toBool,
});

const status = input({
  label: "Status",
  comments: "The status of the ticket.",
  type: "string",
  required: false,
  model: [
    { value: "open", label: "Open" },
    { value: "closed", label: "Closed" },
  ],
  default: "open",
  example: "open",
  placeholder: "open",
  clean: toStr,
});

const subject = input({
  label: "Subject",
  comments: "The subject of the ticket.",
  type: "string",
  required: false,
  clean: toStr,
  placeholder: "Can I get a refund?",
  example: "Can I get a refund?",
});

const tags = input({
  label: "Tags",
  comments: "Tags linked to the ticket.",
  type: "string",
  required: false,
  collection: "valuelist",
  example: "tag1",
  placeholder: "tag1",
  clean: (value: unknown) => arrayObjectsStringMap(value, "name"),
});

const trashed_datetime = input({
  label: "Trashed Datetime",
  comments: "When the ticket was moved to the trash.",
  type: "string",
  required: false,
  clean: toDate,
  placeholder: "2020-01-27T10:42:21.468912",
  example: "2020-01-27T10:42:21.468912",
});

const updated_datetime = input({
  label: "Updated Datetime",
  comments: "When the ticket was lastly updated.",
  type: "string",
  required: false,
  clean: toDate,
  placeholder: "2020-01-27T10:42:21.468912",
  example: "2020-01-27T10:42:21.468912",
});

const via = input({
  label: "Via",
  comments:
    "How the first message of the ticket has been received or sent from Gorgias.",
  type: "string",
  required: false,
  model: VIA_MODEL,
  clean: toStr,
  placeholder: "email",
  example: "email",
});

const ticket_id = input({
  label: "Ticket ID",
  comments: "The ID of the ticket.",
  type: "string",
  required: true,
  clean: toInt,
  example: "1234567890",
  placeholder: "1234567890",
});

export const createTicketInputs = {
  messages,
  assignee_team,
  assignee_user,
  channel,
  closed_datetime,
  created_datetime,
  customer,
  external_id,
  from_agent,
  language,
  last_message_datetime,
  last_received_message_datetime,
  meta,
  opened_datetime,
  snooze_datetime,
  spam,
  status,
  subject,
  tags,
  trashed_datetime,
  updated_datetime,
  via,
  ...sharedInputs,
};

export const deleteTicketInputs = {
  id: input({ ...id, comments: "The ID of the ticket to delete." }),
  ...sharedInputs,
};

export const getTicketInputs = {
  id,
  relationships: input({
    label: "Relationships",
    comments: "Names of relations that should be included in returned data.",
    type: "string",
    collection: "valuelist",
    placeholder: "custom_fields",
    example: "custom_fields",
    required: false,
    clean: cleanValueListInput,
  }),
  ...sharedInputs,
};

export const listTicketsInputs = {
  customer_id: input({
    label: "Customer ID",
    comments: "The ID of a customer used to select their tickets.",
    type: "string",
    required: false,
    clean: validateId,
    placeholder: "4",
    example: "4",
  }),
  external_id: input({
    label: "External ID",
    comments: "ID of the ticket in a foreign system you're looking for.",
    type: "string",
    required: false,
    clean: toStr,
    placeholder: "ticket-ge432d",
    example: "ticket-ge432d",
  }),
  view_id: input({
    label: "View ID",
    comments:
      "The ID of a view used to select tickets matching the filters of this one.",
    type: "string",
    required: false,
    clean: validateId,
    placeholder: "21",
    example: "21",
  }),
  rule_id: input({
    label: "Rule ID",
    comments:
      "The ID of a rule used to select tickets matching the filters of this one.",
    type: "string",
    required: false,
    clean: validateId,
    placeholder: "21",
    example: "21",
  }),
  ticket_ids: input({
    label: "Ticket IDs",
    comments: "The IDs of tickets to select.",
    type: "string",
    required: false,
    collection: "valuelist",
    example: "1234567890",
    placeholder: "1234567890",
    clean: cleanValueListInput,
  }),
  fetchAll: input({
    label: "Fetch All",
    comments:
      "When enabled, all tickets will be fetched. This can be slow if you have a lot of tickets. Cursor and limit will be ignored.",
    type: "boolean",
    required: false,
    default: "false",
    example: "true",
    placeholder: "true",
    clean: util.types.toBool,
  }),
  cursor: input({
    label: "Cursor",
    comments:
      "Value indicating your position in the list of all tickets. If omitted, the first tickets of the list will be returned.",
    type: "string",
    required: false,
    example: "cHJldl9fNl9fMjAyMS0wMy0wMyAwNjowMDowMA==",
    placeholder: "cHJldl9fNl9fMjAyMS0wMy0wMyAwNjowMDowMA==",
    clean: toStr,
  }),
  limit: input({
    label: "Limit",
    comments:
      "Maximum number of tickets to return. The max number allowed is 100.",
    type: "string",
    required: false,
    clean: validateLimit,
    placeholder: "30",
    example: "30",
  }),
  order_by: input({
    label: "Order By",
    comments: "Attribute used to order tickets.",
    type: "string",
    required: false,
    clean: toStr,
    placeholder: "created_datetime:desc",
    example: "created_datetime:desc",
    model: [
      {
        value: "created_datetime:asc",
        label: "Created Date (Ascending)",
      },
      {
        value: "created_datetime:desc",
        label: "Created Date (Descending)",
      },
      {
        value: "updated_datetime:asc",
        label: "Updated Date (Ascending)",
      },
      {
        value: "updated_datetime:desc",
        label: "Updated Date (Descending)",
      },
    ],
  }),
  ...sharedInputs,
};

export const selectTicketInputs = {
  customer_id: listTicketsInputs.customer_id,
  view_id: listTicketsInputs.view_id,
  rule_id: listTicketsInputs.rule_id,
  connection: sharedInputs.connection,
};

export const updateTicketInputs = {
  id,
  assignee_team,
  assignee_user,
  channel,
  closed_datetime,
  customer,
  external_id,
  from_agent,
  is_unread: input({
    label: "Is Unread",
    comments: "Whether the ticket is unread for you.",
    type: "string",
    required: false,
    example: "true",
    placeholder: "true",
    model: BOOLEAN_MODEL,
    clean: util.types.toBool,
  }),
  language,
  last_message_datetime,
  last_received_message_datetime,
  meta,
  opened_datetime,
  snooze_datetime,
  spam,
  status,
  tags,
  trashed_datetime,
  updated_datetime,
  via,
  ...sharedInputs,
};

export const listTicketCustomFieldsInputs = {
  ticket_id,
  ...sharedInputs,
};

export const updateTicketCustomFieldsInputs = {
  ticket_id,
  custom_fields: input({
    label: "Custom Fields",
    comments: "Custom fields to update.",
    type: "code",
    language: "json",
    required: true,
    example: JSON.stringify(
      [
        {
          id: "number",
          value: "string",
        },
        {
          id: "number",
          value: "string",
        },
      ],
      null,
      2,
    ),
    clean: (value: unknown) => cleanArrayCodeInput(value, "Custom Fields"),
  }),
  ...sharedInputs,
};

export const deleteTicketCustomFieldInputs = {
  ticket_id,
  id: input({
    label: "Custom Field ID",
    comments: "The ID of the custom field.",
    type: "string",
    required: true,
    example: "1234567890",
    placeholder: "1234567890",
    clean: toInt,
  }),
  ...sharedInputs,
};
