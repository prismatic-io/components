import { input, util } from "@prismatic-io/spectral";
import { connectionInput } from "./common";


const webhookFields = [
  "firstName",
  "lastName",
  "hireDate",
  "department",
  "middleName",
  "dateOfBirth",
  "ssn",
  "address1",
  "address2",
  "city",
  "state",
  "zipcode",
  "mobilePhone",
  "homePhone",
  "workEmail",
  "jobTitle",
  "location",
  "gender",
  "maritalStatus",
  "payType",
  "eeo",
  "status",
  "workPhone",
  "workPhoneExtension",
  "employeeNumber",
  "ethnicity",
  "division",
  "homeEmail",
  "preferredName",
  "employeeStatusDate",
  "country",
  "payChangeReason",
  "payRateEffectiveDate",
  "exempt",
  "twitterFeed",
  "facebook",
  "linkedIn",
  "pinterest",
  "acaStatus",
  "payPer",
  "originalHireDate",
  "paySchedule",
  "instagram",
  "allergies",
  "dietaryRestrictions",
  "hoursPerPayCycle",
];

const showOnlyInstanceWebhooks = input({
  label: "Show Only Instance Webhooks",
  comments:
    "When true, only webhooks that point to this instance are returned.",
  type: "boolean",
  default: "true",
  clean: util.types.toBool,
});

const name = input({
  label: "Webhook Name",
  required: true,
  type: "string",
  comments: "A descriptive label used to identify the webhook in BambooHR.",
  placeholder: "Enter webhook name",
  example: "New Hire Notifications",
  clean: util.types.toString,
});

const url = input({
  label: "Callback URL",
  required: true,
  comments: "The URL where BambooHR should send webhook payloads.",
  placeholder: "Enter callback URL",
  example: "https://example.com/webhook",
  type: "string",
  clean: util.types.toString,
});

const monitorFields = input({
  label: "Fields to Monitor",
  required: true,
  comments: `One or more fields to trigger this webhook on. This can be any of the following: ${webhookFields.join(
    ", ",
  )}.`,
  type: "string",
  collection: "valuelist",
  model: webhookFields.map((field) => ({ label: field, value: field })),
});

const postFields = input({
  label: "Fields to Send to Webhook",
  required: true,
  comments: `The list of fields to include in the payload posted to the callback URL. This can be any of the following: ${webhookFields.join(
    ", ",
  )}.`,
  type: "string",
  collection: "valuelist",
  model: webhookFields.map((field) => ({ label: field, value: field })),
});

const allowDuplicates = input({
  label: "Allow Duplicates",
  type: "boolean",
  default: "false",
  comments:
    "When true, allows the creation of duplicate webhooks. By default this action checks if a webhook with this callback and sheet ID already exists and, if so, skips configuration.",
  clean: util.types.toBool,
});

const webhookId = input({
  label: "Webhook ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the webhook.",
  placeholder: "Enter webhook ID",
  example: "789",
  clean: util.types.toString,
});

export const listWebhooksInputs = {
  connection: connectionInput,
  showOnlyInstanceWebhooks,
};

export const createWebhookInputs = {
  connection: connectionInput,
  name,
  url,
  monitorFields,
  postFields,
  allowDuplicates,
};

export const deleteWebhookByIdInputs = {
  connection: connectionInput,
  webhookId,
};

export const deleteInstanceWebhooksInputs = {
  connection: connectionInput,
};
