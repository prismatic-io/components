export const listSitemapUrlsOutputSchema = {
  type: "array" as const,
  items: {
    type: "object",
    properties: {
      loc: { type: "string", format: "uri" },
      lastmod: { type: ["string", "null"], format: "date-time" },
    },
    required: ["loc", "lastmod"],
  },
};

export const getPublishedPageHtmlOutputSchema = {
  type: "object" as const,
  properties: {
    url: { type: "string", format: "uri" },
    finalUrl: { type: "string", format: "uri" },
    statusCode: { type: "integer" },
    contentType: { type: ["string", "null"] },
    lastModified: { type: ["string", "null"] },
    etag: { type: ["string", "null"] },
    html: { type: "string" },
  },
  required: ["url", "finalUrl", "statusCode", "html"],
};
