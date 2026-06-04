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
import { toDate } from "../utils/toDate";
import { toInt } from "../utils/toInt";
import { toStr } from "../utils/toStr";
import { validateLimit } from "../utils/validateLimit";
import { sharedInputs } from "./shared";


const attachments = input({
  label: "Attachments",
  comments: "A list of files attached to the message.",
  type: "code",
  language: "json",
  required: false,
  example: JSON.stringify(ATTACHMENTS_EXAMPLE, null, 2),
  clean: (value: unknown) => cleanArrayCodeInput(value, "Attachments"),
});

const body_html = input({
  label: "Body HTML",
  comments: "The full HTML version of the body of the message, if any.",
  type: "string",
  required: false,
  clean: toStr,
  placeholder:
    "Hello,<br><br>        I can't place an order on your site, it says: I don't have enough credit.<br>        How can I add some credits?<br><br>        Cheers,<br>        John Doe        ",
  example:
    "Hello,<br><br>        I can't place an order on your site, it says: I don't have enough credit.<br>        How can I add some credits?<br><br>        Cheers,<br>        John Doe        ",
});

const body_text = input({
  label: "Body Text",
  comments: "The full text version of the body of the message, if any.",
  type: "string",
  required: false,
  clean: toStr,
  placeholder:
    "Hello,        I can't place an order on your site, it says: I don't have enough credit.        How can I add some credits?        Cheers,        John Doe        ",
  example:
    "Hello,        I can't place an order on your site, it says: I don't have enough credit.        How can I add some credits?        Cheers,        John Doe        ",
});

const channel = input({
  label: "Channel",
  comments: "The channel where the message was sent.",
  type: "string",
  required: true,
  model: CHANNEL_MODEL,
  clean: toStr,
  placeholder: "aircall",
  example: "aircall",
});

const created_datetime = input({
  label: "Created Date",
  comments: "When the message was created.",
  type: "string",
  required: false,
  clean: toDate,
  placeholder: "2020-01-27T10:42:21.468912",
  example: "2020-01-27T10:42:21.468912",
});

const external_id = input({
  label: "External ID",
  comments:
    "ID of the message in a foreign system (Aircall, Zendesk, etc...). This field is not used by Gorgias, feel free to set it as you wish.",
  type: "string",
  required: false,
  clean: toStr,
  placeholder: "MSG-78545",
  example: "MSG-78545",
});

const failed_datetime = input({
  label: "Failed Date",
  comments: "When the message failed to be sent.",
  type: "string",
  required: false,
  clean: toDate,
  placeholder: "2020-01-27T10:42:21.468912",
  example: "2020-01-27T10:42:21.468912",
});

const from_agent = input({
  label: "From Agent",
  comments:
    "Whether the message was sent by your company to a customer, or the opposite.",
  type: "string",
  required: true,
  model: BOOLEAN_MODEL,
  clean: util.types.toBool,
  placeholder: "true",
  example: "true",
});

const message_id = input({
  label: "Message ID",
  comments:
    "ID of the message on the service that send the message.It can be the ID of an email, a Messenger message, a Facebook comment, etc...",
  type: "string",
  required: false,
  clean: toStr,
  placeholder: "<123345676453.2445.234@web>",
  example: "<123345676453.2445.234@web>",
});

const receiver = input({
  label: "Receiver ID",
  comments:
    "The primary receiver of the message. It can be a user or a customer. Optional when the source type is 'internal-note'.",
  type: "code",
  language: "json",
  required: false,
  example: JSON.stringify(RECEIVER_EXAMPLE, null, 2),
  clean: (value: unknown) => cleanCodeInput(value, "Receiver"),
});

const sender = input({
  label: "Sender",
  comments: "The person who sent the message. It can be a user or a customer.",
  type: "code",
  language: "json",
  required: false,
  example: JSON.stringify(SENDER_EXAMPLE, null, 2),
  clean: (value: unknown) => cleanCodeInput(value, "Sender"),
});

const sent_datetime = input({
  label: "Sent Date",
  comments:
    "When the message was sent. If omitted, the message will be sent by Gorgias.",
  type: "string",
  required: false,
  clean: toDate,
  placeholder: "2020-01-27T10:42:21.468912",
  example: "2020-01-27T10:42:21.468912",
});


const source = input({
  label: "Source",
  comments:
    "Information used to route the message. It contains the names and the addresses of the sender and receivers. https://developers.gorgias.com/reference/create-ticket-message",
  type: "code",
  language: "json",
  required: true,
  example: JSON.stringify(SOURCE_EXAMPLE, null, 2),
  clean: (value: unknown) => cleanCodeInput(value, "Source"),
});

const subject = input({
  label: "Subject",
  comments: "The subject of the message.",
  type: "string",
  required: false,
  clean: toStr,
  example: "Order issue",
  placeholder: "Order issue",
});

const via = input({
  label: "Via",
  comments: "How the message has been received, or sent from Gorgias.",
  type: "string",
  required: true,
  model: VIA_MODEL,
  clean: toStr,
  placeholder: "aircall",
  example: "aircall",
});

const action = input({
  label: "Action",
  comments:
    "Policy applied on external actions associated with the message if they failed.",
  type: "string",
  required: false,
  clean: toStr,
  placeholder: "force",
  example: "force",
  model: [
    { value: "force", label: "Force" },
    { value: "retry", label: "Retry" },
    { value: "cancel", label: "Cancel" },
  ],
});

const ticket_id = input({
  label: "Ticket ID",
  comments: "The ID of the ticket associated with the message.",
  type: "string",
  required: true,
  example: "353768814",
  placeholder: "353768814",
  clean: toInt,
});

const id = input({
  label: "Message ID",
  comments: "The ID of the message.",
  type: "string",
  required: true,
  clean: toInt,
  example: "353768814",
  placeholder: "353768814",
});

export const createTicketMessageInputs = {
  ticket_id,
  channel,
  from_agent: input({ ...from_agent, type: "boolean", required: false }),
  source,
  via,
  action,
  attachments,
  body_html,
  body_text,
  created_datetime,
  external_id,
  failed_datetime,
  message_id,
  receiver,
  sender,
  sent_datetime,
  subject,
  ...sharedInputs,
};

export const getTicketMessageInputs = {
  ticket_id,
  id,
  ...sharedInputs,
};

export const updateTicketMessageInputs = {
  ticket_id,
  id,
  action,
  attachments,
  body_html,
  body_text,
  channel,
  external_id,
  failed_datetime,
  from_agent,
  message_id,
  receiver,
  sender,
  sent_datetime,
  source,
  subject,
  via,
  ...sharedInputs,
};

export const deleteTicketMessageInputs = {
  ticket_id,
  id,
  ...sharedInputs,
};

export const listMessagesInputs = {
  fetchAll: input({
    label: "Fetch All",
    comments:
      "When enabled, all messages will be fetched. This can be slow if you have a lot of messages. Cursor and limit will be ignored.",
    type: "boolean",
    required: false,
    default: "false",
    clean: util.types.toBool,
  }),
  ticket_id: input({
    label: "Ticket ID",
    comments: "The ID of the ticket the messages are associated with.",
    type: "string",
    required: false,
    clean: toInt,
    placeholder: "353768814",
    example: "353768814",
  }),
  cursor: input({
    label: "Cursor",
    comments:
      "Value indicating your position in the list of all messages. If omitted, the first messages of the list will be returned.",
    type: "string",
    required: false,
    clean: toStr,
    placeholder: "cHJldl9fNl9fMjAyMS0wMy0wMyAwNjowMDowMA==",
    example: "cHJldl9fNl9fMjAyMS0wMy0wMyAwNjowMDowMA==",
  }),
  limit: input({
    label: "Limit",
    comments:
      "Maximum number of messages to return. The max number allowed is 100.",
    type: "string",
    required: false,
    clean: validateLimit,
    placeholder: "30",
    example: "30",
  }),
  order_by: input({
    label: "Order By",
    comments: "Attribute used to order messages.",
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

export const selectMessageInputs = {
  ticket_id: listMessagesInputs.ticket_id,
  connection: sharedInputs.connection,
};
