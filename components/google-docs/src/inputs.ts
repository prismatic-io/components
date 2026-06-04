import { input, util } from "@prismatic-io/spectral";

export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
});

export const documentId = input({
  label: "Document ID",
  type: "string",
  required: true,
  comments: "The ID of the document to retrieve.",
  clean: util.types.toString,
});

export const suggestionsViewMode = input({
  label: "Suggestions View Mode",
  type: "string",
  required: false,
  comments: "The suggestions view mode to apply to the document.",
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

export const title = input({
  label: "Title",
  type: "string",
  required: true,
  comments: "The title of the document to create.",
  clean: util.types.toString,
});

export const requests = input({
  label: "Requests",
  type: "code",
  language: "json",
  required: false,
  comments: "A list of updates to apply to the document.",
  example:
    "https://developers.google.com/docs/api/reference/rest/v1/documents/request#request",
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

export const requiredRevisionId = input({
  label: "Required Revision ID",
  type: "string",
  required: false,
  comments:
    "The optional revision ID of the document the write request is applied to. If this is not the latest revision of the document, the request is not processed and returns a 400 bad request error.",
  example:
    "https://developers.google.com/docs/api/reference/rest/v1/documents/batchUpdate#writecontrol",
  clean: util.types.toString,
});

export const targetRevisionId = input({
  label: "Target Revision ID",
  type: "string",
  required: false,
  comments:
    "The optional target revision ID of the document the write request is applied to.",
  example:
    "https://developers.google.com/docs/api/reference/rest/v1/documents/batchUpdate#writecontrol",
  clean: util.types.toString,
});
