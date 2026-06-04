import { input, util } from "@prismatic-io/spectral";
import { connectionInput, version } from "./common";

const messageKey = input({
  label: "Message Key",
  placeholder: "Enter message key",
  type: "string",
  required: true,
  comments: "The unique key identifying the transactional message template to send.",
  example: "welcome_message",
  clean: util.types.toString,
});

const definitionKey = input({
  label: "Definition Key",
  placeholder: "Enter definition key",
  type: "string",
  required: true,
  comments: "The unique key of the message template definition used for the transactional send.",
  example: "welcome_message",
  clean: util.types.toString,
});

const recipientContactKey = input({
  label: "Recipient Contact Key",
  placeholder: "Enter recipient contact key",
  type: "string",
  required: true,
  comments: "The unique key identifying the recipient contact in Salesforce Marketing Cloud.",
  example: "sf_contact_0034R00002abcDEF",
  clean: util.types.toString,
});

const recipientEmail = input({
  label: "Recipient Email",
  placeholder: "Enter recipient email address",
  type: "string",
  required: true,
  comments: "The email address of the recipient for the transactional send.",
  example: "john@doe.com",
  clean: util.types.toString,
});

const recipientAttributes = input({
  label: "Recipient Attributes",
  placeholder: "Enter attribute name and value",
  type: "string",
  collection: "keyvaluelist",
  required: false,
  comments: "Key-value pairs to personalize the message.",
});

export const sendTransactionalEmailInputs = {
  messageKey,
  definitionKey,
  recipientContactKey,
  recipientEmail,
  recipientAttributes,
  connection: connectionInput,
  version,
};
