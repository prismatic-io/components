export const archiveBoardOutputSchema = {
  type: "object" as const,
  properties: {
    archive_board: {
      type: "object" as const,
      properties: {
        id: { type: "string" },
      },
      required: ["id"],
    },
  },
  required: ["archive_board"],
};
export const createBoardOutputSchema = {
  type: "object" as const,
  properties: {
    create_board: {
      type: "object" as const,
      properties: {
        id: { type: "string" },
      },
      required: ["id"],
    },
  },
  required: ["create_board"],
};
export const getBoardOutputSchema = {
  type: "object" as const,
  properties: {
    boards: {
      type: "array" as const,
      items: {
        type: "object" as const,
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          state: { type: "string" },
          board_folder_id: { type: ["string", "null"] },
          columns: {
            type: "array" as const,
            items: {
              type: "object" as const,
              properties: {
                title: { type: "string" },
                type: { type: "string" },
              },
            },
          },
          creator: {
            type: "object" as const,
            properties: {
              id: { type: "string" },
            },
          },
        },
      },
    },
  },
  required: ["boards"],
};
export const listBoardsOutputSchema = {
  type: "object" as const,
  properties: {
    boards: {
      type: "array" as const,
      items: {
        type: "object" as const,
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          state: { type: "string" },
          board_folder_id: { type: ["string", "null"] },
          creator: {
            type: "object" as const,
            properties: {
              id: { type: "string" },
            },
          },
        },
      },
    },
  },
  required: ["boards"],
};
export const getItemsByColumnValueNewOutputSchema = {
  type: "object" as const,
  properties: {
    items_by_column_values: {
      type: "array" as const,
      items: {
        type: "object" as const,
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          creator: {
            type: "object" as const,
            properties: {
              email: { type: "string" },
            },
          },
          updated_at: { type: "string" },
          state: { type: "string" },
          column_values: {
            type: "array" as const,
            items: {
              type: "object" as const,
              properties: {
                id: { type: "string" },
                text: { type: "string" },
                column: {
                  type: "object" as const,
                  properties: {
                    description: { type: ["string", "null"] },
                    title: { type: "string" },
                  },
                },
                type: { type: "string" },
                value: { type: ["string", "null"] },
              },
            },
          },
        },
      },
    },
  },
  required: ["items_by_column_values"],
};
export const createWebhookOutputSchema = {
  type: "object" as const,
  properties: {
    create_webhook: {
      type: "object" as const,
      properties: {
        id: { type: "string" },
        board_id: { type: "string" },
        event: { type: "string" },
        config: { type: ["string", "null"] },
      },
      required: ["id", "board_id"],
    },
  },
  required: ["create_webhook"],
};
export const deleteWebhookOutputSchema = {
  type: "object" as const,
  properties: {
    delete_webhook: {
      type: "object" as const,
      properties: {
        id: { type: "string" },
        board_id: { type: "string" },
      },
      required: ["id", "board_id"],
    },
  },
  required: ["delete_webhook"],
};
export const listWebhooksOutputSchema = {
  type: "object" as const,
  properties: {
    webhooks: {
      type: "array" as const,
      items: {
        type: "object" as const,
        properties: {
          id: { type: "string" },
          board_id: { type: "string" },
          event: { type: "string" },
          config: { type: ["string", "null"] },
        },
      },
    },
  },
  required: ["webhooks"],
};
