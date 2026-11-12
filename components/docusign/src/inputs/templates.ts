import { input, util } from "@prismatic-io/spectral";
import { cleanString } from "../util";
import { templateJson } from "../json/templateJson";
import { templateDocument } from "../json/templateDocument";
import { connection, fetchAll, jsonInput } from "./common";
import { documentId, documentIds, encrypt, showChanges } from "./envelopes";

const templateId = input({
  label: "Template ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the template.",
  example: "d6f6a764-1021-43df-b8db-06c5477dd28a",
  placeholder: "Enter Template ID",
  clean: util.types.toString,
});

const fileType = input({
  label: "File Type",
  type: "string",
  required: false,
  comments: "The type of file to retrieve.",
  placeholder: "Enter file type",
  clean: cleanString,
});

export const createTemplateInputs = {
  connection,
  jsonInput: {
    ...jsonInput,
    required: true,
    default: JSON.stringify(templateJson, null, 2),
    comments:
      "For extra fields, see the [Create Template API reference](https://developers.docusign.com/docs/esign-rest-api/reference/templates/templates/create/).",
  },
};

export const deleteTemplateDocumentInputs = {
  connection,
  templateId,
  documentIds,
};

export const getTemplateInputs = {
  connection,
  templateId,
};

export const getTemplateDocumentInputs = {
  connection,
  templateId,
  documentId,
  encrypt,
  fileType,
  showChanges: {
    ...showChanges,
    comments:
      "When true, any document fields that a recipient changed are highlighted in yellow in the returned PDF document, and optional signatures or initials are outlined in red.",
  },
};

export const listTemplateDocumentsInputs = {
  connection,
  templateId,
};

export const listTemplatesInputs = {
  connection,
  fetchAll,
};

export const updateTemplateInputs = {
  connection,
  jsonInput: {
    ...jsonInput,
    required: true,
    default: JSON.stringify(templateJson, null, 2),
    comments:
      "For extra fields, see the [Update Template API reference](https://developers.docusign.com/docs/esign-rest-api/reference/templates/templates/update/).",
  },
  templateId,
};

export const updateTemplateDocumentInputs = {
  connection,
  jsonInput: {
    ...jsonInput,
    required: true,
    default: JSON.stringify(templateDocument, null, 2),
    comments:
      "For extra fields, see the [Update Template Document API reference](https://developers.docusign.com/docs/esign-rest-api/reference/templates/templatedocuments/update/).",
  },
  templateId,
  documentId,
};
