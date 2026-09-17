import { userSchema } from "./common";
export const getAboutOutputSchema = {
  type: "object" as const,
  properties: {
    kind: { type: "string" },
    user: userSchema,
    storageQuota: {
      type: "object",
      properties: {
        limit: { type: "string" },
        usage: { type: "string" },
        usageInDrive: { type: "string" },
        usageInDriveTrash: { type: "string" },
      },
      required: [],
    },
    importFormats: {
      type: "object",
      additionalProperties: { type: "array", items: { type: "string" } },
    },
    exportFormats: {
      type: "object",
      additionalProperties: { type: "array", items: { type: "string" } },
    },
    maxImportSizes: {
      type: "object",
      additionalProperties: { type: "string" },
    },
    maxUploadSize: { type: "string" },
    appInstalled: { type: "boolean" },
    folderColorPalette: { type: "array", items: { type: "string" } },
    driveThemes: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          backgroundImageLink: { type: "string" },
          colorRgb: { type: "string" },
        },
        required: [],
      },
    },
    canCreateDrives: { type: "boolean" },
  },
  required: [],
  additionalProperties: true,
};
export const getCurrentUserOutputSchema = userSchema;
