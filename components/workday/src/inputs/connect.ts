import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { SERVICES, WORKDAY_API_DOCS_URL } from "../constants";
import { cleanArrayCodeInput, cleanStringInput } from "../util";
import {
  extraBody,
  connection,
  modelBooleanUpdateInput,
  extraParameters,
  paginationQueryStringInputs,
  referenceId,
} from "./common";
const createdById = input({
  label: "Created By ID",
  comments: "Identifies the user who created the record.",
  type: "string",
  placeholder: "Enter created by ID",
  example: "3aa5550b7fe348b98d7b5741afc65534",
  required: false,
  clean: cleanStringInput,
});
const messageTemplateId = input({
  label: "Message Template ID",
  comments: "Identifies the Connect message template.",
  type: "string",
  example: "6e0f4a2b8c1d4e3fa9b7c5d3e1f2a4b6",
  placeholder: "Enter message template ID",
  required: true,
  clean: util.types.toString,
  dataSource: "selectMessageTemplate",
});
const emailDetailName = input({
  label: "Name",
  comments: "Name of the email content.",
  type: "string",
  required: false,
  example: "Benefits Enrollment Reminder",
  placeholder: "Enter email name",
  clean: cleanStringInput,
});
const emailDetailSubject = input({
  label: "Subject",
  comments: "Subject line of the email.",
  type: "string",
  required: false,
  example: "Reminder: Benefits open enrollment closes Friday",
  placeholder: "Enter email subject",
  clean: cleanStringInput,
});
const emailDetailBody = input({
  label: "Body",
  comments: "Body text of the email.",
  type: "text",
  required: false,
  example:
    "Open enrollment closes on Friday. Review and submit your benefit elections in Workday.",
  placeholder: "Enter email body",
  clean: cleanStringInput,
});
const emailDetailReplyTo = input({
  label: "Reply To",
  comments: "Email address that replies are sent to.",
  type: "string",
  required: false,
  example: "hr@example.com",
  placeholder: "Enter reply-to email address",
  clean: cleanStringInput,
});
const emailDetail = structuredObjectInput({
  label: "Email Detail",
  required: false,
  comments: "Email content for the message: Name, Subject, Body, and Reply To.",
  inputs: {
    name: emailDetailName,
    subject: emailDetailSubject,
    body: emailDetailBody,
    replyTo: emailDetailReplyTo,
  },
});
const pushDetailMessage = input({
  label: "Message",
  comments: "Text of the mobile push notification.",
  type: "string",
  required: false,
  example: "Open enrollment closes on Friday.",
  placeholder: "Enter push notification message",
  clean: cleanStringInput,
});
const pushDetailRedirectURL = input({
  label: "Redirect URL",
  comments: "URL the push notification opens when selected.",
  type: "string",
  required: false,
  example: "https://www.example.com/benefits",
  placeholder: "Enter redirect URL",
  clean: cleanStringInput,
});
const pushDetailId = input({
  label: "ID",
  comments: "Identifies the push notification detail.",
  type: "string",
  required: false,
  example: "2c4e6a8b0d1f43e5a7c9b1d3f5e7a9c1",
  placeholder: "Enter push detail ID",
  clean: cleanStringInput,
});
const pushDetail = structuredObjectInput({
  label: "Push Detail",
  required: false,
  comments:
    "Mobile push notification content for the message: Message, Redirect URL, and ID.",
  inputs: {
    message: pushDetailMessage,
    redirectURL: pushDetailRedirectURL,
    id: pushDetailId,
  },
});
const senderOverrideId = input({
  label: "Sender Override ID",
  comments: "Overrides the icon displayed for the sender.",
  type: "string",
  placeholder: "Enter sender override ID",
  example: "9a7c5e3b1d2f4a6c8e0b2d4f6a8c0e2b",
  required: false,
  clean: cleanStringInput,
});
const commId = input({
  label: "Communication ID",
  comments: "Identifier of the Workday communication group.",
  type: "string",
  placeholder: "Enter communication ID",
  example: "4d6f8a0c2e1b43a5b7d9f1a3c5e7b9d1",
  required: false,
  clean: cleanStringInput,
});
const contacts = input({
  label: "Contacts",
  type: "code",
  language: "json",
  comments:
    "Contacts to send the message to. This should be an array of contacts.",
  required: false,
  placeholder: "Enter contacts as a JSON array",
  example: JSON.stringify(
    [
      {
        descriptor: "Logan McNeil",
        id: "3aa5550b7fe348b98d7b5741afc65534",
      },
    ],
    null,
    2,
  ),
  clean: (value: unknown) => cleanArrayCodeInput(value, "Contacts"),
});
const notificationTypeId = input({
  label: "Notification Type ID",
  comments: "Identifies the notification type used for delivery.",
  type: "string",
  placeholder: "Enter notification type ID",
  example: "1f3a5c7e9b0d42f4a6c8e0b2d4f6a8c0",
  required: false,
  clean: cleanStringInput,
});
const postMessageTemplatesExtraBodyExample = JSON.stringify(
  {
    lastUpdated: "2024-06-08T07:00:00.000Z",
    usageCount: "12",
    createdOn: "2024-06-08T07:00:00.000Z",
    lastUpdatedBy: {
      id: "58571c1e23784c869d949f4d63421f0c",
    },
  },
  null,
  2,
);
const postMessageTemplatesExtraBodyComments = `${extraBody.comments} See [Workday API documentation](${WORKDAY_API_DOCS_URL}#${SERVICES.connect.slice(1)}/post-/messageTemplates) for more information.`;
const messageTemplateName = input({
  label: "Message Template Name",
  comments: "Display name given to the message template.",
  type: "string",
  example: "Benefits Enrollment Reminder",
  placeholder: "Enter message template name",
  required: true,
  clean: util.types.toString,
});
const templateInactive = input({
  label: "Template Inactive",
  comments: "When true, marks the template as inactive.",
  type: "boolean",
  required: false,
  default: "true",
  clean: util.types.toBool,
});
const templateDescriptor = input({
  label: "Template Descriptor",
  comments: "Human-readable descriptor for the template.",
  type: "string",
  example: "Benefits Enrollment Reminder",
  placeholder: "Enter template descriptor",
  required: false,
  clean: cleanStringInput,
});
const templateId = input({
  label: "Template ID",
  comments:
    "Optional identifier to assign to the template, sent as its id in the request body.",
  type: "string",
  example: "6e0f4a2b8c1d4e3fa9b7c5d3e1f2a4b6",
  placeholder: "Enter template ID",
  required: false,
  clean: cleanStringInput,
});
export const getMessageTemplateByIdInputs = {
  connection,
  messageTemplateId,
};
export const listMessageTemplatesInputs = {
  connection,
  ...paginationQueryStringInputs,
  extraParameters,
};
export const postMessageTemplatesInputs = {
  connection,
  messageTemplateName,
  notificationTypeId: {
    ...notificationTypeId,
    comments:
      "Identifies the notification type, which determines where the template can be used.",
    required: true,
    clean: util.types.toString,
  },
  createdById,
  emailDetail,
  pushDetail,
  referenceId,
  templateInactive,
  templateDescriptor,
  templateId,
  extraBody: {
    ...extraBody,
    example: postMessageTemplatesExtraBodyExample,
    comments: postMessageTemplatesExtraBodyComments,
  },
};
const messageDetails = structuredObjectInput({
  label: "Message Details",
  required: false,
  comments: "Email, push notification, and recipient details for the message.",
  inputs: {
    emailDetailName: { ...emailDetailName, label: "Email Detail Name" },
    emailDetailSubject: {
      ...emailDetailSubject,
      label: "Email Detail Subject",
    },
    emailDetailBody: { ...emailDetailBody, label: "Email Detail Body" },
    emailDetailReplyTo: {
      ...emailDetailReplyTo,
      label: "Email Detail Reply To",
    },
    pushDetailMessage: {
      ...pushDetailMessage,
      label: "Push Detail Message",
    },
    pushDetailRedirectURL: {
      ...pushDetailRedirectURL,
      label: "Push Detail Redirect URL",
    },
    pushDetailId: { ...pushDetailId, label: "Push Detail ID" },
    contacts,
  },
});
export const sendMessageInputs = {
  connection,
  senderOverrideId,
  commId,
  messageDetails,
  messageTemplateId: {
    ...messageTemplateId,
    required: false,
  },
  notificationTypeId,
};
const { connection: _connection, ...postMessageTemplatesFields } =
  postMessageTemplatesInputs;
export const updateMessageTemplateByIdInputs = {
  connection,
  messageTemplateId,
  ...postMessageTemplatesFields,
  templateInactive: {
    ...postMessageTemplatesInputs.templateInactive,
    ...modelBooleanUpdateInput,
    label: postMessageTemplatesInputs.templateInactive.label,
  },
};
