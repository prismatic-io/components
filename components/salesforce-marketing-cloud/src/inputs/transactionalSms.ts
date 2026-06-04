import { input, util } from "@prismatic-io/spectral";
import { toOptionalString } from "../util";
import { connection, fetchAll, page, pageSize } from "./common";





const smsMessageKey = input({
  label: "Message Key",
  type: "string",
  required: true,
  comments:
    "A unique identifier that you can use to track the status of the message. The key can contain up to 100 characters.",
  example: "msg-abc-123",
  placeholder: "Enter message key",
  clean: util.types.toString,
});

const smsDefinitionKey = input({
  label: "Definition Key",
  type: "string",
  required: true,
  comments: "The unique key identifying the transactional SMS definition.",
  example: "order-confirmation-sms",
  placeholder: "Enter SMS definition key",
  dataSource: "selectSmsDefinition",
  clean: util.types.toString,
});

const smsDefinitionName = input({
  label: "Definition Name",
  type: "string",
  required: true,
  comments: "The display name for the transactional SMS definition.",
  example: "Order Confirmation SMS",
  placeholder: "Enter definition name",
  clean: util.types.toString,
});

const smsDefinitionDescription = input({
  label: "Definition Description",
  type: "string",
  required: false,
  comments: "A description of the transactional SMS definition.",
  example: "Sends order confirmation via SMS",
  placeholder: "Enter definition description",
  clean: toOptionalString,
});

const smsDefinitionExtraBody = input({
  label: "Extra Body",
  type: "code",
  language: "json",
  required: false,
  comments:
    "Additional properties to include in the SMS definition creation request.",
  example: JSON.stringify(
    {
      content: { message: "Your order {{OrderNumber}} has been confirmed." },
      subscriptions: {
        shortCode: "12345",
        countryCode: "US",
        keyword: "ORDER",
      },
    },
    null,
    2,
  ),
  clean: util.types.toObject,
});





const smsRecipientContactKey = input({
  label: "Recipient Contact Key",
  type: "string",
  required: true,
  comments: "The contact key (subscriber key) of the SMS recipient.",
  example: "contact-abc-123",
  placeholder: "Enter recipient contact key",
  clean: util.types.toString,
});

const smsRecipientPhone = input({
  label: "Recipient Phone",
  type: "string",
  required: true,
  comments:
    "The phone number to send the SMS to, including country code (e.g., +15551234567).",
  example: "+15551234567",
  placeholder: "Enter recipient phone number",
  clean: util.types.toString,
});

const smsRecipientAttributes = input({
  label: "Recipient Attributes",
  type: "code",
  language: "json",
  required: false,
  comments: "Key-value pairs of personalization attributes for the SMS.",
  example: JSON.stringify(
    {
      OrderNumber: "ORD-12345",
      CustomerName: "John Doe",
    },
    null,
    2,
  ),
  clean: util.types.toObject,
});

const smsBatchRecipients = input({
  label: "Recipients",
  type: "code",
  language: "json",
  required: true,
  comments:
    "An array of recipient objects for batch SMS sending. Each must include contactKey and to (phone number).",
  example: JSON.stringify(
    [
      {
        contactKey: "contact-abc-123",
        to: "+15551234567",
        attributes: { OrderNumber: "ORD-12345" },
      },
      {
        contactKey: "contact-def-456",
        to: "+15559876543",
        attributes: { OrderNumber: "ORD-67890" },
      },
    ],
    null,
    2,
  ),
  clean: util.types.toObject,
});





export const listSmsDefinitionsInputs = {
  connection,
  fetchAll,
  pageSize,
  page,
};

export const getSmsDefinitionInputs = {
  connection,
  smsDefinitionKey,
};

export const createSmsDefinitionInputs = {
  connection,
  smsDefinitionKey,
  smsDefinitionName,
  smsDefinitionDescription,
  smsDefinitionExtraBody,
};

export const sendSmsInputs = {
  connection,
  smsMessageKey,
  smsDefinitionKey,
  smsRecipientContactKey,
  smsRecipientPhone,
  smsRecipientAttributes,
};

export const updateSmsDefinitionInputs = {
  connection,
  smsDefinitionKey,
  smsDefinitionName: {
    ...smsDefinitionName,
    required: false,
    clean: toOptionalString,
  },
  smsDefinitionDescription,
  smsDefinitionExtraBody,
};

export const deleteSmsDefinitionInputs = {
  connection,
  smsDefinitionKey,
};

export const sendSmsBatchInputs = {
  connection,
  smsDefinitionKey,
  smsBatchRecipients,
};
