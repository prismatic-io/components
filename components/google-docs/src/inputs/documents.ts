import { input, util } from "@prismatic-io/spectral";
import { cleanString, connectionInput } from "./common";

const documentId = input({
  label: "Document ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the document to retrieve.",
  example: "1A2b3C4d5E6f7G8h9I0jKlMnOpQrStUvWxYz",
  placeholder: "Enter document ID",
  clean: util.types.toString,
});

const suggestionsViewMode = input({
  label: "Suggestions View Mode",
  type: "string",
  required: false,
  comments:
    "The mode that controls how suggested edits are rendered in the returned document.",
  model: [
    {
      label: "DEFAULT_FOR_CURRENT_ACCESS",
      value: "DEFAULT_FOR_CURRENT_ACCESS",
    },
    {
      label: "SUGGESTIONS_INLINE",
      value: "SUGGESTIONS_INLINE",
    },
    {
      label: "PREVIEW_SUGGESTIONS_ACCEPTED",
      value: "PREVIEW_SUGGESTIONS_ACCEPTED",
    },
    {
      label: "PREVIEW_WITHOUT_SUGGESTIONS",
      value: "PREVIEW_WITHOUT_SUGGESTIONS",
    },
  ],
  default: "DEFAULT_FOR_CURRENT_ACCESS",
  clean: util.types.toString,
});

const title = input({
  label: "Title",
  type: "string",
  required: true,
  comments: "The display name for the new document.",
  example: "Quarterly Report",
  placeholder: "Enter document title",
  clean: util.types.toString,
});

const requests = input({
  label: "Requests",
  type: "code",
  language: "json",
  required: false,
  comments:
    "A JSON array of updates to apply to the document. See the [Request object reference](https://developers.google.com/docs/api/reference/rest/v1/documents/request#request) for available request types.",
  example: '[{"insertText":{"location":{"index":1},"text":"Example text"}}]',
  default: JSON.stringify([
    {
      insertText: {
        location: {
          index: 1,
        },
        text: "Example text",
      },
    },
  ]),
  clean: util.types.toString,
});

const requiredRevisionId = input({
  label: "Required Revision ID",
  type: "string",
  required: false,
  comments:
    "The revision ID the write request is applied to. If this is not the latest revision of the document, the request is not processed and returns a 400 bad request error. See the [WriteControl reference](https://developers.google.com/docs/api/reference/rest/v1/documents/batchUpdate#writecontrol).",
  example: "tag.5d8f...",
  placeholder: "Enter required revision ID",
  clean: cleanString,
});

const targetRevisionId = input({
  label: "Target Revision ID",
  type: "string",
  required: false,
  comments:
    "The target revision ID the write request is applied to, merging changes against any collaborator edits made after the document was read. See the [WriteControl reference](https://developers.google.com/docs/api/reference/rest/v1/documents/batchUpdate#writecontrol).",
  example: "tag.5d8f...",
  placeholder: "Enter target revision ID",
  clean: cleanString,
});

export const getDocumentInputs = {
  googleConnection: connectionInput,
  documentId,
  suggestionsViewMode,
};

export const createDocumentInputs = {
  googleConnection: connectionInput,
  title,
};

export const batchUpdateDocumentsInputs = {
  googleConnection: connectionInput,
  documentId: {
    ...documentId,
    comments: "The unique identifier for the document to update.",
  },
  requests,
  requiredRevisionId,
  targetRevisionId,
};
