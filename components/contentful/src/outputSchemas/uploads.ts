import { emptyResultSchema, linkSchema } from "./shared";
const uploadSchema = {
  type: "object" as const,
  properties: {
    sys: {
      type: "object" as const,
      properties: {
        createdAt: { type: "string", format: "date-time" },
        createdBy: linkSchema,
        expiresAt: { type: "string", format: "date-time" },
        id: { type: "string" },
        space: linkSchema,
        type: { type: "string" },
      },
    },
  },
};
export const getUploadOutputSchema = uploadSchema;
export const uploadFileOutputSchema = uploadSchema;
export const deleteUploadOutputSchema = emptyResultSchema;
