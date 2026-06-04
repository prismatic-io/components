import { input, util } from "@prismatic-io/spectral";
import { toOptionalString } from "../util";
import { connection, fetchAll, page, pageSize } from "./common";





const emailDefinitionKey = input({
  label: "Definition Key",
  type: "string",
  required: true,
  comments: "The unique key identifying the transactional email definition.",
  example: "welcome-email-def",
  placeholder: "Enter email definition key",
  dataSource: "selectEmailDefinition",
  clean: util.types.toString,
});

const emailDefinitionName = input({
  label: "Definition Name",
  type: "string",
  required: true,
  comments: "The display name for the transactional email definition.",
  example: "Welcome Email",
  placeholder: "Enter definition name",
  clean: util.types.toString,
});

const emailDefinitionDescription = input({
  label: "Definition Description",
  type: "string",
  required: false,
  comments: "A description of the transactional email definition.",
  example: "Sends a welcome email to new subscribers",
  placeholder: "Enter definition description",
  clean: toOptionalString,
});

const emailContentCustomerKey = input({
  label: "Content Customer Key",
  type: "string",
  required: true,
  comments:
    "The customer key of the Content Builder asset to use as email content.",
  example: "my-email-asset-key",
  placeholder: "Enter content customer key",
  clean: util.types.toString,
});

const emailDefinitionExtraBody = input({
  label: "Extra Body",
  type: "code",
  language: "json",
  required: false,
  comments:
    "Additional properties to include in the email definition creation request.",
  example: JSON.stringify(
    {
      classification: "Default Transactional",
      subscriptions: {
        list: "All Subscribers",
        autoAddSubscriber: true,
      },
    },
    null,
    2,
  ),
  clean: util.types.toObject,
});





const recipientContactKey = input({
  label: "Recipient Contact Key",
  type: "string",
  required: true,
  comments: "The contact key (subscriber key) of the email recipient.",
  example: "contact-abc-123",
  placeholder: "Enter recipient contact key",
  clean: util.types.toString,
});

const recipientEmail = input({
  label: "Recipient Email",
  type: "string",
  required: true,
  comments: "The email address to send to.",
  example: "john.doe@example.com",
  placeholder: "Enter recipient email address",
  clean: util.types.toString,
});

const recipientAttributes = input({
  label: "Recipient Attributes",
  type: "code",
  language: "json",
  required: false,
  comments:
    "Key-value pairs of personalization attributes for the email template.",
  example: JSON.stringify(
    {
      FirstName: "John",
      LastName: "Doe",
      CompanyName: "Acme Corp",
    },
    null,
    2,
  ),
  clean: util.types.toObject,
});

const messageKey = input({
  label: "Message Key",
  type: "string",
  required: false,
  comments:
    "A unique identifier for the send request. Used to check delivery status.",
  example: "msg-abc-123",
  placeholder: "Enter message key",
  clean: toOptionalString,
});

const batchRecipients = input({
  label: "Recipients",
  type: "code",
  language: "json",
  required: true,
  comments:
    "An array of recipient objects for batch email sending. Each must include contactKey and to.",
  example: JSON.stringify(
    [
      {
        contactKey: "contact-abc-123",
        to: "john.doe@example.com",
        attributes: { FirstName: "John" },
      },
      {
        contactKey: "contact-def-456",
        to: "jane.smith@example.com",
        attributes: { FirstName: "Jane" },
      },
    ],
    null,
    2,
  ),
  clean: util.types.toObject,
});





const emailMessageKey = input({
  label: "Message Key",
  type: "string",
  required: true,
  comments: "The message key returned from a send email request.",
  example: "msg-abc-123",
  placeholder: "Enter message key",
  clean: util.types.toString,
});





export const listEmailDefinitionsInputs = {
  connection,
  fetchAll,
  pageSize,
  page,
};

export const getEmailDefinitionInputs = {
  connection,
  emailDefinitionKey,
};

export const createEmailDefinitionInputs = {
  connection,
  emailDefinitionKey,
  emailDefinitionName,
  emailContentCustomerKey,
  emailDefinitionDescription,
  emailDefinitionExtraBody,
};

export const sendEmailInputs = {
  connection,
  messageKey: {
    ...messageKey,
    required: true,
    comments: "The unique identifier of the email definition you want to send.",
    clean: util.types.toString,
  },
  emailDefinitionKey,
  recipientContactKey,
  recipientEmail,
  recipientAttributes,
};

export const sendEmailBatchInputs = {
  connection,
  emailDefinitionKey,
  batchRecipients,
};

export const updateEmailDefinitionInputs = {
  connection,
  emailDefinitionKey,
  emailDefinitionName: {
    ...emailDefinitionName,
    required: false,
    clean: toOptionalString,
  },
  emailDefinitionDescription,
  emailDefinitionExtraBody,
};

export const deleteEmailDefinitionInputs = {
  connection,
  emailDefinitionKey,
};

export const getEmailSendStatusInputs = {
  connection,
  emailMessageKey,
};
