import { driveSchema, fileSchema } from "./common";
const changeSchema = {
  type: "object" as const,
  properties: {
    kind: { type: "string" },
    removed: { type: "boolean" },
    file: fileSchema,
    fileId: { type: "string" },
    time: { type: "string", format: "date-time" },
    driveId: { type: "string" },
    changeType: { type: "string", enum: ["file", "drive"] },
    drive: driveSchema,
  },
  required: [],
};
export const listChangesOutputSchema = {
  type: "object" as const,
  properties: {
    kind: { type: "string", enum: ["drive#changeList"] },
    nextPageToken: { type: "string" },
    newStartPageToken: { type: "string" },
    changes: { type: "array", items: changeSchema },
  },
  required: [],
  additionalProperties: true,
};
