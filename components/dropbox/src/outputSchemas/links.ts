import {
  fileMetadataSchema,
  sharedLinkMetadataSchema,
  withDropboxEnvelope,
} from "./shared";
export const createSharedLinkOutputSchema = withDropboxEnvelope(
  sharedLinkMetadataSchema,
);
export const getSharedLinkFileOutputSchema = withDropboxEnvelope(
  sharedLinkMetadataSchema,
);
export const getTemporaryLinkOutputSchema = withDropboxEnvelope({
  type: "object",
  properties: { metadata: fileMetadataSchema, link: { type: "string" } },
  required: ["metadata", "link"],
});
export const getTemporaryUploadLinkOutputSchema = withDropboxEnvelope({
  type: "object",
  properties: { link: { type: "string" } },
  required: ["link"],
});
export const listSharedLinksOutputSchema = withDropboxEnvelope({
  type: "object",
  properties: {
    links: { type: "array", items: sharedLinkMetadataSchema },
    has_more: { type: "boolean" },
    cursor: { type: "string" },
  },
  required: ["links", "has_more"],
});
