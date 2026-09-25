import {
  customFieldCompactSchema,
  nextPageSchema,
  userCompactSchema,
} from "./shared";
export const userResponseSchema = {
  type: "object" as const,
  properties: {
    data: {
      type: "object" as const,
      properties: {
        gid: { type: "string" },
        resource_type: { type: "string" },
        name: { type: "string" },
        email: { type: "string", format: "email" },
        photo: {
          type: ["object", "null"],
          properties: {
            image_21x21: { type: "string" },
            image_27x27: { type: "string" },
            image_36x36: { type: "string" },
            image_60x60: { type: "string" },
            image_128x128: { type: "string" },
            image_1024x1024: { type: "string" },
          },
          additionalProperties: true,
        },
        workspaces: {
          type: "array",
          items: {
            type: "object" as const,
            properties: {
              gid: { type: "string" },
              resource_type: { type: "string" },
              name: { type: "string" },
            },
            additionalProperties: true,
          },
        },
        custom_fields: { type: "array", items: customFieldCompactSchema },
      },
      required: [] as string[],
      additionalProperties: true,
    },
  },
  required: [] as string[],
  additionalProperties: true,
};
export const listUsersOutputSchema = {
  type: "object" as const,
  properties: {
    data: { type: "array", items: userCompactSchema },
    next_page: nextPageSchema,
  },
  required: [] as string[],
  additionalProperties: true,
};
export const findUserByNameOrEmailOutputSchema = {
  type: "object" as const,
  properties: {
    gid: { type: "string" },
    resource_type: { type: "string" },
    name: { type: "string" },
  },
  required: [] as string[],
  additionalProperties: true,
};
