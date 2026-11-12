import { input, util } from "@prismatic-io/spectral";
import { cleanString, getDocumentIds } from "../util";
import { envelopeJson } from "../json/envelopeJson";
import { connection, jsonInput } from "./common";
import { include } from "./folders";

export const envelopeId = input({
  label: "Envelope ID",
  type: "string",
  required: true,
  comments: "The envelope's GUID.",
  example: "d6f6a764-1021-43df-b8db-06c5477dd28a",
  placeholder: "Enter Envelope ID",
  clean: util.types.toString,
});

const documentsByUserid = input({
  label: "Documents By User ID",
  type: "boolean",
  required: false,
  default: "false",
  comments: "When true, allows recipients to get documents by their user ID.",
  clean: util.types.toBool,
});

const includeMetadata = input({
  label: "Include Metadata",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "When true, the response includes metadata indicating which properties the sender can edit.",
  clean: util.types.toBool,
});

const includeTabs = input({
  label: "Include Tabs",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "When true, information about the tabs, including prefill tabs, associated with the documents is included in the response.",
  clean: util.types.toBool,
});

export const recipientId = input({
  label: "Recipient ID",
  type: "string",
  required: false,
  comments:
    "Allows the sender to retrieve the documents as one of the recipients that they control. The documents_by_userid parameter must be set to false for this to work.",
  example: "3842784d-ef49-43e0-8c9c-714812a90ddd",
  placeholder: "Enter Recipient ID",
  clean: cleanString,
});

const sharedUserId = input({
  label: "Shared User ID",
  type: "string",
  required: false,
  comments:
    "The ID of a shared user to impersonate in order to retrieve their view of the list of documents.",
  example: "3842784d-ef49-43e0-8c9c-714812a90ddd",
  placeholder: "Enter Shared User ID",
  clean: cleanString,
});

export const documentId = input({
  label: "Document ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the document.",
  example: "1",
  placeholder: "Enter Document ID",
  clean: util.types.toString,
});

const certificate = input({
  label: "Certificate",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "When true, the certificate of completion is included in the combined PDF.",
  clean: util.types.toBool,
});

export const encrypt = input({
  label: "Encrypt",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "When true, the PDF bytes returned in the response are encrypted for all key managers configured on the DocuSign account.",
  clean: util.types.toBool,
});

const language = input({
  label: "Language",
  type: "string",
  required: false,
  comments:
    "Specifies the language for the Certificate of Completion in the response. The supported languages are: Chinese Simplified (zh_CN), Chinese Traditional (zh_TW), Dutch (nl), English US (en), French (fr), German (de), Italian (it), Japanese (ja), Korean (ko), Portuguese (pt), Portuguese (Brazil) (pt_BR), Russian (ru), Spanish (es).",
  example: "en",
  placeholder: "Enter language code",
  clean: cleanString,
});

export const showChanges = input({
  label: "Show Changes",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "When true, any changed fields in the returned PDF are highlighted in yellow and optional signatures or initials are outlined in red. The account must have the Highlight Data Changes feature enabled.",
  clean: util.types.toBool,
});

const watermark = input({
  label: "Watermark",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "When true, and the account has the watermark feature enabled, and the envelope is not complete, the watermark for the account is added to the PDF documents. This option can remove the watermark.",
  clean: util.types.toBool,
});

const documentName = input({
  label: "Document Name",
  type: "string",
  required: true,
  default: "newDocument",
  example: "Contract.pdf",
  placeholder: "Enter document name",
  comments: "The file name to give the document, including its extension.",
  clean: util.types.toString,
});

const pdfBuffer = input({
  label: "PDF data",
  placeholder: "PDF data",
  type: "data",
  required: true,
  comments: "This must refer to a buffer containing the raw bytes of a PDF.",
});

export const documentIds = input({
  label: "Document IDs",
  type: "string",
  collection: "valuelist",
  required: true,
  example: '["1", "2", "3"]',
  placeholder: "Enter document IDs",
  comments: "A list of document IDs to delete.",
  clean: getDocumentIds,
});

const advancedUpdate = input({
  label: "Advanced Update",
  type: "boolean",
  required: false,
  default: "false",
  comments: "When true, allows envelope information to be added or modified.",
  clean: util.types.toBool,
});

const changeRoutingOrder = input({
  label: "Change Routing Order",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "When true, allows defining the routing order of recipients while sending documents for signature.",
  clean: util.types.toBool,
});

const mergeRolesOnDraft = input({
  label: "Merge Roles On Draft",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "When true, template roles will be merged and empty recipients will be removed. This parameter applies when creating a draft envelope with multiple templates.",
  clean: util.types.toBool,
});

const resendEnvelope = input({
  label: "Resend Envelope",
  type: "boolean",
  required: false,
  default: "false",
  comments: "When true, resends the specified envelope.",
  clean: util.types.toBool,
});

export const createEnvelopeInputs = {
  connection,
  jsonInput: {
    ...jsonInput,
    required: true,
    default: JSON.stringify(envelopeJson, null, 2),
    comments:
      "For extra fields, see the [Create Envelope API reference](https://developers.docusign.com/docs/esign-rest-api/reference/envelopes/envelopes/create/).",
  },
  changeRoutingOrder,
  mergeRolesOnDraft,
};

export const deleteEnvelopeDocumentInputs = {
  connection,
  envelopeId,
  documentIds,
};

export const getEnvelopeInputs = {
  connection,
  envelopeId,
  advancedUpdate,
  include: {
    ...include,
    comments:
      "Specifies additional information about the envelope to return. Enter a comma-separated list, such as tabs,recipients.",
  },
};

export const getEnvelopeDocumentInputs = {
  connection,
  envelopeId,
  documentId,
  certificate,
  documentsByUserid,
  encrypt,
  language,
  recipientId,
  sharedUserId,
  showChanges,
  watermark,
};

export const listEnvelopeDocumentsInputs = {
  connection,
  envelopeId,
  documentsByUserid,
  includeMetadata,
  includeTabs,
  recipientId,
  sharedUserId,
};

export const updateEnvelopeInputs = {
  connection,
  jsonInput: {
    ...jsonInput,
    required: true,
    default: JSON.stringify(envelopeJson, null, 2),
    comments:
      "For extra fields, see the [Update Envelope API reference](https://developers.docusign.com/docs/esign-rest-api/reference/envelopes/envelopes/update/).",
  },
  envelopeId,
  advancedUpdate: {
    ...advancedUpdate,
    comments:
      "When true, allows the caller to update recipients, tabs, custom fields, notification, email settings and other envelope attributes.",
  },
  resendEnvelope,
};

export const updateEnvelopeDocumentInputs = {
  connection,
  documentName,
  envelopeId,
  documentId: {
    ...documentId,
    comments: "The unique ID of the document within the envelope.",
  },
  pdfBuffer,
};
