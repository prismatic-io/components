export const notionUserObjectSchema = {
  type: "object" as const,
  properties: {
    object: { type: "string", enum: ["user"] },
    id: { type: "string" },
    type: { type: "string" },
    name: { type: "string" },
    avatar_url: { type: ["string", "null"] },
    person: {
      type: "object" as const,
      properties: { email: { type: "string" } },
      required: [],
    },
    bot: {
      type: "object" as const,
      properties: {
        owner: {
          type: "object" as const,
          properties: {
            type: { type: "string" },
            user: {
              type: "object" as const,
              properties: {
                object: { type: "string" },
                id: { type: "string" },
                type: { type: "string" },
                name: { type: "string" },
                avatar_url: { type: ["string", "null"] },
                person: {
                  type: "object" as const,
                  properties: { email: { type: "string" } },
                  required: [],
                },
              },
              required: [],
            },
          },
          required: [],
        },
      },
      required: [],
    },
  },
  required: [],
};
export const getUserOutputSchema = notionUserObjectSchema;
export const getCurrentUserOutputSchema = notionUserObjectSchema;
export const listUsersOutputSchema = {
  type: "object" as const,
  properties: {
    object: { type: "string", enum: ["list"] },
    results: { type: "array", items: notionUserObjectSchema },
    next_cursor: { type: ["string", "null"] },
    has_more: { type: "boolean" },
  },
  required: [],
};
