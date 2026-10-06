export const createTaskAttachmentOutputSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
    version: { type: "string" },
    date: { type: "integer" },
    title: { type: "string" },
    extension: { type: "string" },
    thumbnail_small: { type: "string" },
    thumbnail_large: { type: "string" },
    url: { type: "string" },
  },
  required: [
    "id",
    "version",
    "date",
    "title",
    "extension",
    "thumbnail_small",
    "thumbnail_large",
    "url",
  ],
};
