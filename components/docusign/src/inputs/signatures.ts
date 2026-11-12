import { input, util } from "@prismatic-io/spectral";
import { cleanString, jsonCheck } from "../util";
import { accountSignatureJson } from "../json/accountSignatureJson";
import { accountId } from "./accounts";
import { connection, jsonInput } from "./common";
import { envelopeId, recipientId } from "./envelopes";

const signatureId = input({
  label: "Signature ID",
  type: "string",
  required: true,
  comments: "The unique identifier of the signature.",
  example: "f1d2e9f6-7b8a-4c3d-9e2f-1a0b3c4d5e6f",
  placeholder: "Enter Signature ID",
  clean: util.types.toString,
});

const imageType = input({
  label: "Image Type",
  type: "string",
  required: true,
  comments:
    "The signature image to target: the stamp, full signature, or initials image.",
  placeholder: "Select image type",
  model: [
    { label: "stamp_image", value: "stamp_image" },
    { label: "signature_image", value: "signature_image" },
    { label: "initials_image", value: "initials_image" },
  ],
  clean: util.types.toString,
});

const dateAreaHeight = input({
  label: "Date Area Height",
  type: "string",
  comments: "The height of the rectangle that holds the date on the stamp.",
  example: "50",
  placeholder: "Enter height",
  required: false,
  clean: cleanString,
});

const dateAreaWidth = input({
  label: "Date Area Width",
  type: "string",
  comments: "The width of the rectangle that holds the date on the stamp.",
  example: "100",
  placeholder: "Enter width",
  required: false,
  clean: cleanString,
});

const dateAreaX = input({
  label: "Date Area X",
  type: "string",
  comments:
    "The X axis position of the top-left corner of the date rectangle on the stamp.",
  example: "0",
  placeholder: "Enter X position",
  required: false,
  clean: cleanString,
});

const dateAreaY = input({
  label: "Date Area Y",
  type: "string",
  comments:
    "The Y axis position of the top-left corner of the date rectangle on the stamp.",
  example: "0",
  placeholder: "Enter Y position",
  required: false,
  clean: cleanString,
});

const disallowUserResizeStamp = input({
  label: "Disallow User Resize Stamp",
  type: "boolean",
  comments: "When true, prevents the user from resizing the stamp.",
  required: false,
  default: "false",
  clean: util.types.toBool,
});

const externalID = input({
  label: "External ID",
  type: "string",
  comments:
    "Optionally specify an external identifier for the user's signature.",
  placeholder: "Enter External ID",
  required: false,
  clean: cleanString,
});

const isDefault = input({
  label: "Is Default",
  type: "boolean",
  comments:
    "When true, specifies that the signature is the default signature for the user.",
  required: false,
  default: "false",
  clean: util.types.toBool,
});

const nrdsId = input({
  label: "NRDS ID",
  type: "string",
  comments:
    "The National Association of Realtors (NAR) membership ID for a user who is a realtor.",
  example: "123456789",
  placeholder: "Enter NRDS ID",
  required: false,
  clean: cleanString,
});

const nrdsLastName = input({
  label: "NRDS Last Name",
  type: "string",
  comments: "The last name of the user who is a realtor.",
  example: "Doe",
  placeholder: "Enter last name",
  required: false,
  clean: cleanString,
});

const phoneticName = input({
  label: "Phonetic Name",
  type: "string",
  comments: "The phonetic spelling of the signatureName.",
  placeholder: "Enter phonetic name",
  required: false,
  clean: cleanString,
});

const signatureFont = input({
  label: "Signature Font",
  type: "string",
  comments:
    "The font type to use for the signature if the signature is not drawn.",
  placeholder: "Select signature font",
  required: false,
  model: [
    { label: "1_DocuSign", value: "1_DocuSign" },
    { label: "2_DocuSign", value: "2_DocuSign" },
    { label: "3_DocuSign", value: "3_DocuSign" },
    { label: "4_DocuSign", value: "4_DocuSign" },
    { label: "5_DocuSign", value: "5_DocuSign" },
    { label: "6_DocuSign", value: "6_DocuSign" },
    { label: "7_DocuSign", value: "7_DocuSign" },
    { label: "8_DocuSign", value: "8_DocuSign" },
    { label: "Mistral", value: "Mistral" },
    { label: "Rage Italic", value: "Rage Italic" },
  ],
  clean: cleanString,
});

const signatureGroups = input({
  label: "Signature Groups",
  type: "code",
  language: "json",
  comments:
    "A JSON array of groups that can use the signature, each with a groupId and rights value.",
  default: JSON.stringify([{ groupId: "12345", rights: "editable" }], null, 2),
  placeholder: "Enter signature groups as JSON",
  required: false,
  clean: jsonCheck,
});

const signatureInitials = input({
  label: "Signature Initials",
  type: "string",
  comments: "Specifies the user's signature in initials format.",
  example: "JD",
  placeholder: "Enter initials",
  required: false,
  clean: cleanString,
});

const signatureName = input({
  label: "Signature Name",
  type: "string",
  comments: "The name shown on the signature, such as the signer's full name.",
  example: "John Doe",
  placeholder: "Enter signature name",
  required: false,
  clean: cleanString,
});

const signatureType = input({
  label: "Signature Type",
  type: "string",
  comments:
    "The type of signature. Check this link for more information: https://support.docusign.com/s/document-item?language=en_US&bundleId=xcm1643837555908&topicId=url1578456563691.html",
  example: "Electronic Signature",
  placeholder: "Enter signature type",
  required: false,
  clean: cleanString,
});

const signatureUsers = input({
  label: "Signature Users",
  type: "code",
  comments: "JSON array of users associated with the signature.",
  placeholder: "Enter signature users as JSON",
  language: "json",
  default: JSON.stringify(
    [{ isDefault: "false", userId: "12345", rights: "editable" }],
    null,
    2,
  ),
  required: false,
  clean: jsonCheck,
});

const stampFormat = input({
  label: "Stamp Format",
  type: "string",
  required: false,
  comments:
    "NameHanko refers to the stamp that displays only the name of the signer. On the other hand, NameDateHanko refers to the stamp that displays both the name and date.",
  placeholder: "Select stamp format",
  model: [
    { label: "NameHanko", value: "NameHanko" },
    { label: "NameDateHanko", value: "NameDateHanko" },
  ],
  clean: cleanString,
});

const stampSizeMM = input({
  label: "Stamp Size MM",
  type: "string",
  comments: "The size of the stamp in millimeters.",
  example: "10",
  placeholder: "Enter stamp size in mm",
  required: false,
  clean: cleanString,
});

const includeChrome = input({
  label: "Include Chrome",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "When true, the response includes the chrome-styled version of the signature image.",
  clean: util.types.toBool,
});

export const createAccountSignatureInputs = {
  connection,
  jsonInput: {
    ...jsonInput,
    required: true,
    default: JSON.stringify(accountSignatureJson, null, 2),
    comments:
      "For extra fields, see the [Create Account Signatures API reference](https://developers.docusign.com/docs/esign-rest-api/reference/accounts/accountsignatures/createaccountsignatures/).",
  },
};

export const deleteAccountSignatureInputs = {
  connection,
  accountId,
  signatureId,
};

export const getAccountSignatureInputs = {
  connection,
  signatureId,
};

export const getAccountSignatureImageInputs = {
  connection,
  signatureId,
  imageType,
};

export const getRecipientSignatureInputs = {
  connection,
  envelopeId,
  recipientId: {
    ...recipientId,
    required: true,
    clean: util.types.toString,
    comments:
      "A local reference used to map recipients to other objects, such as specific document tabs. A recipientId must be either an integer or a GUID, and the recipientId must be unique within an envelope.",
  },
};

export const getRecipientSignatureImageInputs = {
  connection,
  envelopeId,
  recipientId: {
    ...recipientId,
    required: true,
    clean: util.types.toString,
    comments:
      "A local reference used to map recipients to other objects, such as specific document tabs. A recipientId must be either an integer or a GUID, and the recipientId must be unique within an envelope.",
  },
  includeChrome,
};

export const updateAccountSignatureInputs = {
  connection,
  signatureIdPath: { ...signatureId, comments: "Signature ID to update." },
  dateAreaHeight,
  dateAreaWidth,
  dateAreaX,
  dateAreaY,
  disallowUserResizeStamp,
  externalID,
  imageType: { ...imageType, required: false, clean: cleanString },
  isDefault,
  nrdsId,
  nrdsLastName,
  phoneticName,
  signatureFont,
  signatureId: {
    ...signatureId,
    required: false,
    clean: cleanString,
    comments: "Specifies the signature ID associated with the signature name.",
  },
  signatureGroups,
  signatureInitials,
  signatureName,
  signatureType,
  signatureUsers,
  stampFormat,
  stampSizeMM,
};

export const updateAccountSignatureImageInputs = {
  connection,
  signatureId: { ...signatureId, comments: "The ID of the account stamp." },
  imageType,
};
