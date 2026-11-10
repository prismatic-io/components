import { input, util } from "@prismatic-io/spectral";
import { connectionInput, eventIdInput } from "./common";
import { messageIdInput } from "./messages";

const attachmentIdInput = input({
  label: "Attachment ID",
  type: "string",
  required: true,
  clean: util.types.toString,
  comments: "The unique identifier of the attachment.",
  example: "AAMkADI5MAAIT3drCAAABEgAQANAqbAe7qaROhYdTnUQwXm0=",
  placeholder: "Enter Attachment ID",
});

export const listMessageAttachmentsInputs = {
  connection: connectionInput,
  messageId: messageIdInput,
};

export const downloadMessageAttachmentInputs = {
  connection: connectionInput,
  messageId: messageIdInput,
  attachmentId: {
    ...attachmentIdInput,
    dataSource: "selectMessageAttachment",
    comments:
      "The unique identifier of the attachment. Use the List Message Attachments action to find it.",
  },
};

export const listEventAttachmentsInputs = {
  connection: connectionInput,
  eventId: eventIdInput,
};

export const downloadEventAttachmentInputs = {
  connection: connectionInput,
  eventId: eventIdInput,
  attachmentId: {
    ...attachmentIdInput,
    dataSource: "selectEventAttachment",
    comments:
      "The unique identifier of the attachment. Use the List Event Attachments action to find it.",
  },
};
