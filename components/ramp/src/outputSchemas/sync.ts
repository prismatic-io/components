export const postSyncStatusOutputSchema = {
  type: "object" as const,
  properties: {
    sync_id: {
      type: "string",
      format: "uuid",
    },
  },
  required: ["sync_id"],
};
