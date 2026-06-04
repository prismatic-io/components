import { input, util } from "@prismatic-io/spectral";
import { SERVICES } from "../constants";
import { cleanArrayCodeInput, cleanCodeInput, cleanStringInput } from "../util";
import {
  additionalFields,
  connection,
  modelBooleanUpdateInput,
  params,
  referenceId,
} from "./shared";

const createdById = input({
  label: "Created By ID",
  comments: "Identifies the user who created the record.",
  type: "string",
  placeholder: "Enter created by ID",
  example: "",
  required: false,
  clean: cleanStringInput,
});

const messageTemplateId = input({
  label: "Message Template ID",
  comments: "Identifies the Connect message template.",
  type: "string",
  example: "",
  placeholder: "Enter message template ID",
  required: true,
  clean: util.types.toString,
  dataSource: "selectMessageTemplate",
});

const emailDetail = input({
  label: "Email Detail",
  type: "code",
  language: "json",
  comments: "Details for the email.",
  required: false,
  example: JSON.stringify(
    {
      name: "Lorem ipsum dolor sit amet, cum choro singulis consectetuer ut, ubique iisque contentiones ex duo. Quo lorem etiam eu.",
      body: "Lorem ipsum dolor sit amet, cum choro singulis consectetuer ut, ubique iisque contentiones ex duo. Quo lorem etiam eu.",
      subject:
        "Lorem ipsum dolor sit amet, cum choro singulis consectetuer ut, ubique iisque contentiones ex duo. Quo lorem etiam eu.",
      replyTo:
        "Lorem ipsum dolor sit amet, cum choro singulis consectetuer ut, ubique iisque contentiones ex duo. Quo lorem etiam eu.",
    },
    null,
    2,
  ),
  clean: (value: unknown) => cleanCodeInput(value, "Email Detail"),
});

const pushDetail = input({
  label: "Push Detail",
  type: "code",
  language: "json",
  comments: "Details for the push notification.",
  required: false,
  example: JSON.stringify(
    {
      redirectURL:
        "Lorem ipsum dolor sit amet, cum choro singulis consectetuer ut, ubique iisque contentiones ex duo. Quo lorem etiam eu.",
      message:
        "Lorem ipsum dolor sit amet, cum choro singulis consectetuer ut, ubique iisque contentiones ex duo. Quo lorem etiam eu.",
      id: "string",
    },
    null,
    2,
  ),
  clean: (value: unknown) => cleanCodeInput(value, "Push Detail"),
});

const senderOverrideId = input({
  label: "Sender Override ID",
  comments: "Overrides the icon displayed for the sender.",
  type: "string",
  placeholder: "Enter sender override ID",
  example: "",
  required: false,
  clean: cleanStringInput,
});

const commId = input({
  label: "Communication ID",
  comments: "Identifier of the Workday communication group.",
  type: "string",
  placeholder: "Enter communication ID",
  example: "",
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
  example: JSON.stringify(
    [
      {
        descriptor: "Lorem ipsum dolor sit ame",
        id: "string",
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
  example: "",
  required: false,
  clean: cleanStringInput,
});


const postMessageTemplatesAdditionalFieldsExample = JSON.stringify(
  {
    lastUpdated: "2024-06-08T07:00:00.000Z",
    usageCount: "2001658030",
    createdOn: "2024-06-08T07:00:00.000Z",
    notificationType: {
      id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
    },
    lastUpdatedBy: {
      id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
    },
  },
  null,
  2,
);
const postMessageTemplatesAdditionalFieldsComments = `${additionalFields.comments} See [Workday API documentation](https://community.workday.com/sites/default/files/file-hosting/restapi/index.html#${SERVICES.connect.slice(1)}/post-/messageTemplates) for more information.`;

const messageTemplateName = input({
  label: "Message Template Name",
  comments: "Display name given to the message template.",
  type: "string",
  example: "",
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

const temaplateDescriptor = input({
  label: "Template Descriptor",
  comments: "Human-readable descriptor for the template.",
  type: "string",
  example: "",
  placeholder: "Enter template descriptor",
  required: false,
  clean: cleanStringInput,
});

const templateId = input({
  label: "Template ID",
  comments: "Identifies the message template record.",
  type: "string",
  example: "",
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
  params,
};

export const postMessageTemplatesInputs = {
  connection,
  createdById,
  emailDetail,
  pushDetail,
  messageTemplateName,
  referenceId,
  templateInactive,
  temaplateDescriptor,
  templateId,
  additionalFields: {
    ...additionalFields,
    example: postMessageTemplatesAdditionalFieldsExample,
    comments: postMessageTemplatesAdditionalFieldsComments,
  },
};

export const sendMessageInputs = {
  connection,
  senderOverrideId,
  commId,
  emailDetail,
  contacts,
  messageTemplateId: {
    ...messageTemplateId,
    required: false,
  },
  notificationTypeId,
  pushDetail,
};

export const updateMessageTemplateByIdInputs = {
  messageTemplateId,
  ...postMessageTemplatesInputs,
  messageTemplateName: {
    ...postMessageTemplatesInputs.messageTemplateName,
    required: false,
  },
  templateInactive: {
    ...postMessageTemplatesInputs.templateInactive,
    ...modelBooleanUpdateInput,
    label: postMessageTemplatesInputs.templateInactive.label,
  },
};
