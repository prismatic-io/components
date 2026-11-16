import { driveItemPageSchema, driveItemSchema } from "./common";

export const listDriveFilesOutputSchema = driveItemPageSchema;

export const listDriveFolderFilesOutputSchema = driveItemPageSchema;

export const uploadFileOutputSchema = driveItemSchema;

export const updateFileOutputSchema = driveItemSchema;

export const moveFileOutputSchema = driveItemSchema;

export const listChangesOutputSchema = {
  type: "object" as const,
  properties: {
    "@odata.context": { type: "string" },
    value: {
      type: "array",
      items: { ...driveItemSchema, required: [], additionalProperties: true },
    },
    "@odata.nextLink": { type: "string" },
    "@odata.deltaLink": { type: "string" },
  },
  required: ["value"],
};

export const listSharedDocumentsOutputSchema = {
  type: "object" as const,
  properties: {
    "@odata.context": { type: "string" },
    value: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          lastShared: {
            type: "object",
            properties: {
              sharedDateTime: { type: "string", format: "date-time" },
              sharingSubject: { type: "string" },
              sharingType: { type: "string" },
              sharedBy: {
                type: "object",
                properties: {
                  displayName: { type: "string" },
                  id: { type: "string" },
                  address: { type: "string" },
                },
              },
              sharingReference: {
                type: "object",
                properties: {
                  webUrl: { type: "string" },
                  id: { type: "string" },
                  type: { type: "string" },
                },
              },
            },
          },
          resourceVisualization: {
            type: "object",
            properties: {
              title: { type: "string" },
              type: { type: "string" },
              mediaType: { type: "string" },
              previewImageUrl: { type: "string" },
              previewText: { type: "string" },
              containerWebUrl: { type: "string" },
              containerDisplayName: { type: "string" },
              containerType: { type: "string" },
            },
          },
          resourceReference: {
            type: "object",
            properties: {
              webUrl: { type: "string" },
              id: { type: "string" },
              type: { type: "string" },
            },
          },
        },
        required: ["id"],
      },
    },
    "@odata.nextLink": { type: "string" },
  },
  required: ["value"],
};
