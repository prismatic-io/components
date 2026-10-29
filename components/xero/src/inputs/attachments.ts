import { input, util } from "@prismatic-io/spectral";
import { connectionInput } from "./common";

export const objectType = input({
  label: "Object Type",
  type: "string",
  required: true,
  comments: "The type of object to attach the file to.",
  placeholder: "Enter object type",
  clean: util.types.toString,
  model: [
    { label: "Accounts", value: "accounts" },
    { label: "Bank Transactions", value: "banktransactions" },
    { label: "Bank Transfers", value: "banktransfers" },
    { label: "Contacts", value: "contacts" },
    { label: "Credit Notes", value: "creditnotes" },
    { label: "Invoices", value: "invoices" },
    { label: "Manual Journals", value: "manualjournals" },
    { label: "Purchase Orders", value: "purchaseorders" },
    { label: "Receipts", value: "receipts" },
    { label: "Repeating Invoices", value: "repeatinginvoices" },
  ],
});

export const objectId = input({
  label: "Object ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the object to attach the file to.",
  placeholder: "Enter object ID",
  example: "example-e40f-414a-8f95-ce6a63196e1a",
  clean: util.types.toString,
});

export const fileName = input({
  label: "File Name",
  type: "string",
  required: true,
  comments:
    "The name of the file to attach. This becomes the unique identifier of the file for update operations.",
  placeholder: "Enter file name",
  example: "My Example File",
  clean: util.types.toString,
});

export const file = input({
  label: "File Data",
  type: "data",
  required: true,
  comments: "The binary contents of the file to upload.",
  placeholder: "Enter file data",
  clean: util.types.toBufferDataPayload,
});

export const contentType = input({
  label: "Content Type",
  type: "string",
  required: true,
  comments: "The MIME type of the file to upload.",
  example: "image/png",
  placeholder: "Enter content type",
  clean: util.types.toString,
});

export const createAttachmentInputs = {
  xeroConnection: connectionInput,
  objectType,
  objectId,
  fileName,
  file,
  contentType,
};

export const getAttachmentInputs = {
  xeroConnection: connectionInput,
  objectType,
  objectId,
  fileName,
};
