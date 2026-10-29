import { batchErrorSchema } from "./shared";

export const listAssociationTypesOutputSchema = {
  type: "object" as const,
  properties: {
    results: {
      type: "array" as const,
      items: {
        type: "object" as const,
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          category: {
            type: "string",
            enum: [
              "HUBSPOT_DEFINED",
              "INTEGRATOR_DEFINED",
              "USER_DEFINED",
              "WORK",
            ],
          },
          typeId: { type: "integer" },
          label: { type: ["string", "null"] as string[] },
        },
        required: ["id", "name", "category", "typeId", "label"],
      },
    },
  },
  required: ["results"],
};

export const createAssociationsOutputSchema = {
  type: "object" as const,
  properties: {
    completedAt: { type: "string", format: "date-time" },
    startedAt: { type: "string", format: "date-time" },
    status: {
      type: "string",
      enum: ["CANCELED", "COMPLETE", "PENDING", "PROCESSING"],
    },
    results: {
      type: "array" as const,
      items: {
        type: "object" as const,
        properties: {
          from: {
            type: "object" as const,
            properties: { id: { type: "string" } },
            required: ["id"],
          },
          to: {
            type: "object" as const,
            properties: { id: { type: "string" } },
            required: ["id"],
          },
          type: { type: "string" },
          fromObjectId: { type: "string" },
          fromObjectTypeId: { type: "string" },
          toObjectId: { type: "string" },
          toObjectTypeId: { type: "string" },
          labels: { type: "array" as const, items: { type: "string" } },
        },
        required: ["from", "to", "type"],
      },
    },
    numErrors: { type: ["integer", "null"] as string[] },
    errors: { type: ["array", "null"] as string[], items: batchErrorSchema },
    links: {
      type: ["object", "null"] as string[],
      additionalProperties: { type: "string" },
    },
    requestedAt: { type: ["string", "null"] as string[], format: "date-time" },
  },
  required: ["completedAt", "startedAt", "status", "results"],
};

export const readAssociationsOutputSchema = {
  type: "object" as const,
  properties: {
    completedAt: { type: "string", format: "date-time" },
    startedAt: { type: "string", format: "date-time" },
    status: {
      type: "string",
      enum: ["CANCELED", "COMPLETE", "PENDING", "PROCESSING"],
    },
    results: {
      type: "array" as const,
      items: {
        type: "object" as const,
        properties: {
          from: {
            type: "object" as const,
            properties: { id: { type: "string" } },
            required: ["id"],
          },
          to: {
            type: "array" as const,
            items: {
              type: "object" as const,
              properties: {
                id: { type: "string" },
                type: { type: "string" },
                toObjectId: { type: "string" },
                associationTypes: {
                  type: "array" as const,
                  items: {
                    type: "object" as const,
                    properties: {
                      category: {
                        type: "string",
                        enum: [
                          "HUBSPOT_DEFINED",
                          "INTEGRATOR_DEFINED",
                          "USER_DEFINED",
                          "WORK",
                        ],
                      },
                      typeId: { type: "integer" },
                      label: { type: ["string", "null"] as string[] },
                    },
                    required: ["category", "typeId"],
                  },
                },
              },
              required: ["id", "toObjectId", "associationTypes"],
            },
          },
          paging: {
            type: ["object", "null"] as string[],
            properties: {
              next: {
                type: "object" as const,
                properties: {
                  after: { type: "string" },
                  link: { type: ["string", "null"] as string[] },
                },
                required: ["after"],
              },
              prev: {
                type: "object" as const,
                properties: {
                  before: { type: "string" },
                  link: { type: ["string", "null"] as string[] },
                },
                required: ["before"],
              },
            },
          },
        },
      },
    },
    numErrors: { type: ["integer", "null"] as string[] },
    errors: { type: ["array", "null"] as string[], items: batchErrorSchema },
    links: {
      type: ["object", "null"] as string[],
      additionalProperties: { type: "string" },
    },
    requestedAt: { type: ["string", "null"] as string[], format: "date-time" },
  },
  required: ["completedAt", "startedAt", "status", "results"],
};

export const archiveAssociationsOutputSchema = {
  type: "object" as const,
  properties: {
    completedAt: { type: "string", format: "date-time" },
    startedAt: { type: "string", format: "date-time" },
    status: {
      type: "string",
      enum: ["CANCELED", "COMPLETE", "PENDING", "PROCESSING"],
    },
    results: { type: "array" as const, items: { type: "object" as const } },
    numErrors: { type: ["integer", "null"] as string[] },
    errors: { type: ["array", "null"] as string[], items: batchErrorSchema },
    links: {
      type: ["object", "null"] as string[],
      additionalProperties: { type: "string" },
    },
    requestedAt: { type: ["string", "null"] as string[], format: "date-time" },
  },
  required: ["completedAt", "startedAt", "status", "results"],
};
