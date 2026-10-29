import { input, util } from "@prismatic-io/spectral";
import { UPDATE_REQUEST_BODY_EXAMPLE } from "../constants";
import { cleanCodeInput } from "../actionUtils";

export const file = input({
  label: "File",
  comments: "File to attach. This should be a reference to a previous step.",
  type: "data",
  required: true,
  clean: util.types.toBufferDataPayload,
});

export const note = input({
  label: "Note",
  placeholder: "Enter note text",
  comments:
    "The note is either related to the attachment specified with the FileName attribute, or as a standalone note. Required for note attachments.",
  type: "string",
  required: false,
  clean: util.types.toString,
});

export const fileName = input({
  label: "File Name",
  placeholder: "Enter file name",
  comments: "The file name of the attachment.",
  type: "string",
  required: true,
  example: "receipt_nov15.jpg",
  clean: util.types.toString,
});

export const entityRefValue = input({
  label: "Entity Reference Value",
  placeholder: "Enter entity reference value",
  comments:
    "Object reference to which this attachment is linked. Set this value with the ID of the target object as returned in its response body when queried.",
  type: "string",
  required: false,
  example: "95",
  clean: util.types.toString,
});

export const entityRefType = input({
  label: "Entity Reference Type",
  placeholder: "Enter entity reference type",
  comments:
    "Object reference to which this attachment is linked. Set this value with the specific type of the target object.",
  type: "string",
  required: false,
  example: "Invoice",
  clean: util.types.toString,
});

export const fileType = input({
  label: "File Type",
  comments: "The file type of the attachment.",
  type: "string",
  required: true,
  model: [
    { label: "ai", value: "application/postscript" },
    { label: "csv", value: "text/csv" },
    { label: "doc", value: "application/msword" },
    {
      label: "docx",
      value:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    },
    { label: "eps", value: "application/postscript" },
    { label: "gif", value: "image/gif" },
    { label: "jpeg", value: "image/jpeg" },
    { label: "jpg", value: "image/jpg" },
    { label: "ods", value: "application/vnd.oasis.opendocument.spreadsheet" },
    { label: "pdf", value: "application/pdf" },
    { label: "png", value: "image/png" },
    { label: "rtf", value: "text/rtf" },
    { label: "tif", value: "image/tiff" },
    { label: "txt", value: "text/plain" },
    { label: "xls", value: "application/vnd.ms-excel" },
    {
      label: "xlsx",
      value:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    },
    { label: "xml", value: "text/xml" },
  ],
  clean: util.types.toString,
});

export const includeOnSend = input({
  label: "Include on Send",
  comments:
    "Used when Entity Reference Type references a transaction object. This field indicates whether or not the attachment is sent with the transaction when Save and Send button is clicked in the QuickBooks UI or when the Send endpoint is invoked for the object.",
  type: "boolean",
  required: false,
  default: "false",
  clean: util.types.toBool,
});

export const attachableId = input({
  label: "Attachable ID",
  placeholder: "Enter attachable ID",
  comments: "The unique identifier of the attachment.",
  type: "string",
  required: true,
  example: "5000000000001348400",
  clean: util.types.toString,
});

export const attachablePayload = input({
  label: "Attachable Payload",
  comments:
    'The full payload of the attachable as returned in a read response. Could be a reference from a previously executed "Read Attachable" action response data.',
  type: "data",
  required: true,
  clean: util.types.toData,
});

export const attachableEntityType = input({
  label: "Attachable Entity Type",
  placeholder: "Enter attachable entity type",
  type: "string",
  required: true,
  example: "purchase",
  comments: "The type of the entity that the attachable is linked to.",
  clean: util.types.toString,
});

export const attachableEntityId = input({
  label: "Attachable Entity ID",
  placeholder: "Enter attachable entity ID",
  type: "string",
  required: true,
  example: "611",
  comments: "The ID of the entity that the attachable is linked to.",
  clean: util.types.toString,
});

export const updateRequestBody = input({
  label: "Update Request Body",
  placeholder: "Enter update request body",
  comments:
    "The request body must include all writable fields of the existing object as returned in a read response. Writable fields omitted from the request body are set to NULL. The ID of the object to update is specified in the request body.",
  type: "code",
  language: "json",
  example: JSON.stringify(UPDATE_REQUEST_BODY_EXAMPLE, null, 2),
  required: true,
  clean: cleanCodeInput,
});
