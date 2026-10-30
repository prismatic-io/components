import { fileFullSchema } from "./common";

export const uploadFileOutputSchema = {
  type: "object" as const,
  properties: {
    total_count: { type: "integer" },
    entries: { type: "array", items: fileFullSchema },
  },
};

export const getFileDownloadUrlOutputSchema = {
  type: "string" as const,
  format: "uri",
};
