import { yesNoSchema } from "./shared";

export const listEmployeeFilesOutputSchema = {
  type: "object" as const,
  properties: {
    employee: {
      type: "object",
      properties: {
        id: { type: "integer" },
      },
    },
    categories: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "integer" },
          name: { type: "string" },
          canRenameCategory: yesNoSchema,
          canDeleteCategory: yesNoSchema,
          canUploadFiles: yesNoSchema,
          displayIfEmpty: yesNoSchema,
          files: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "integer" },
                name: { type: "string" },
                originalFileName: { type: "string" },
                size: { type: "integer" },
                dateCreated: { type: "string" },
                createdBy: { type: "string" },
                shareWithEmployee: yesNoSchema,
                canRenameFile: yesNoSchema,
                canDeleteFile: yesNoSchema,
                canChangeShareWithEmployeeFieldValue: yesNoSchema,
              },
            },
          },
        },
      },
    },
  },
};
