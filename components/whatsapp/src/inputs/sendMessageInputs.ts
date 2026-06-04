import { input, util } from "@prismatic-io/spectral";
import {
  cleanArrayCodeInput,
  cleanCodeInput,
  cleanStringInput,
} from "../utils";
import { connection } from "./general";
import {
  AUDIO_JSON_EXAMPLE,
  CONTACTS_JSON_EXAMPLE,
  CONTEXT_JSON_EXAMPLE,
  DOCUMENT_JSON_EXAMPLE,
  IMAGE_JSON_EXAMPLE,
  INTERACTIVE_JSON_EXAMPLE,
  LOCATION_JSON_EXAMPLE,
  MESSAGE_TYPES_MODEL,
  REACTION_JSON_EXAMPLE,
  STICKER_JSON_EXAMPLE,
  TEMPLATE_JSON_EXAMPLE,
  TEXT_JSON_EXAMPLE,
} from "../constants";

const phoneNumberId = input({
  label: "Phone Number ID",
  type: "string",
  required: true,
  comments:
    "Phone number ID of the WhatsApp Business Account you want to use to send the message.",
  placeholder: "Enter a Phone Number ID",
  example: "912345678912345",
  clean: util.types.toString,
});

const audio = input({
  label: "Audio",
  type: "code",
  language: "json",
  required: false,
  comments: "A media object containing audio. Required when type is audio.",
  example: AUDIO_JSON_EXAMPLE,
  clean: (value: unknown) => cleanCodeInput(value, "Audio"),
});

const bizOpaqueCallbackData = input({
  label: "Biz Opaque Callback Data",
  type: "string",
  required: false,
  comments: "An arbitrary string, useful for tracking. Maximum 512 characters.",
  placeholder: "Enter your Biz Opaque Callback Data",
  example: "Some arbitrary string",
  clean: cleanStringInput,
});

const contacts = input({
  label: "Contacts",
  type: "code",
  language: "json",
  required: false,
  comments: "A contacts object. Required when type is contacts.",
  example: CONTACTS_JSON_EXAMPLE,
  clean: (value: unknown) => cleanArrayCodeInput(value, "Contacts"),
});

const contextInput = input({
  label: "Context",
  type: "code",
  language: "json",
  required: false,
  comments:
    "An object containing the ID of a previous message you are replying to. Required if replying to any message in the conversation.",
  example: CONTEXT_JSON_EXAMPLE,
  clean: (value: unknown) => cleanCodeInput(value, "Context"),
});

const document = input({
  label: "Document",
  type: "code",
  language: "json",
  required: false,
  comments:
    "A media object containing a document. Required when type is document.",
  example: DOCUMENT_JSON_EXAMPLE,
  clean: (value: unknown) => cleanCodeInput(value, "Document"),
});

const image = input({
  label: "Image",
  type: "code",
  language: "json",
  required: false,
  comments: "A media object containing an image. Required when type is image.",
  example: IMAGE_JSON_EXAMPLE,
  clean: (value: unknown) => cleanCodeInput(value, "Image"),
});

const interactive = input({
  label: "Interactive",
  type: "code",
  language: "json",
  required: false,
  comments: "An interactive object. Required when type is interactive.",
  example: INTERACTIVE_JSON_EXAMPLE,
  clean: (value: unknown) => cleanCodeInput(value, "Interactive"),
});

const location = input({
  label: "Location",
  type: "code",
  language: "json",
  required: false,
  comments: "A location object. Required when type is location.",
  example: LOCATION_JSON_EXAMPLE,
  clean: (value: unknown) => cleanCodeInput(value, "Location"),
});

const reaction = input({
  label: "Reaction",
  type: "code",
  language: "json",
  required: false,
  comments: "A reaction object. Required when type is reaction.",
  example: REACTION_JSON_EXAMPLE,
  clean: (value: unknown) => cleanCodeInput(value, "Reaction"),
});

const previewUrl = input({
  label: "Preview URL",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "Allows for URL previews in text messages. Required when type is text.",
  clean: util.types.toBool,
});

const status = input({
  label: "Status",
  type: "string",
  required: false,
  comments:
    "A message's status. You can use this field to mark a message as read.",
  placeholder: "Enter your Status",
  example: "read",
  clean: cleanStringInput,
});

const sticker = input({
  label: "Sticker",
  type: "code",
  language: "json",
  required: false,
  comments:
    "A media object containing a sticker. Required when type is sticker.",
  example: STICKER_JSON_EXAMPLE,
  clean: (value: unknown) => cleanCodeInput(value, "Sticker"),
});

const template = input({
  label: "Template",
  type: "code",
  language: "json",
  required: false,
  comments: "A template object. Required when type is template.",
  example: TEMPLATE_JSON_EXAMPLE,
  clean: (value: unknown) => cleanCodeInput(value, "Template"),
});

const text = input({
  label: "Text",
  type: "code",
  language: "json",
  required: false,
  comments: "A text object. Required when type is text.",
  example: TEXT_JSON_EXAMPLE,
  clean: (value: unknown) => cleanCodeInput(value, "Text"),
});

const to = input({
  label: "To",
  type: "string",
  required: true,
  comments:
    "WhatsApp ID or phone number of the customer you want to send a message to.",
  placeholder: "Enter your To",
  example: "12124567890",
  clean: util.types.toString,
});

const type = input({
  label: "Type",
  type: "string",
  required: false,
  comments:
    "The type of message you want to send. If omitted, defaults to text.",
  placeholder: "Enter your Type",
  default: "text",
  example: "text",
  model: MESSAGE_TYPES_MODEL,

  clean: cleanStringInput,
});

export const sendMessageInputs = {
  connection,
  phoneNumberId,
  to,
  type,
  audio,
  contacts,
  document,
  sticker,
  template,
  text,
  image,
  reaction,
  interactive,
  location,
  previewUrl,
  bizOpaqueCallbackData,
  contextInput,
  status,
};
