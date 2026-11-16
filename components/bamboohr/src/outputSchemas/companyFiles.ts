import { yesNoSchema } from "./shared";

export const listCompanyFilesOutputSchema = {
  type: "object" as const,
  properties: {
    categories: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "integer" },
          name: { type: "string" },
          canUploadFiles: yesNoSchema,
          files: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "integer" },
                name: { type: "string" },
                originalFileName: { type: "string" },
                size: { type: "string" },
                dateCreated: { type: "string" },
                createdBy: { type: "string" },
                shareWithEmployees: yesNoSchema,
                canRenameFile: yesNoSchema,
                canDeleteFile: yesNoSchema,
              },
            },
          },
        },
      },
    },
  },
};
