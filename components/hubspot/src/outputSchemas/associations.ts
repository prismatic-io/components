export const listAssociationTypesOutputSchema = {
  type: "object" as const,
  properties: {
    results: {
      type: "array" as const,
      items: {
        type: "object" as const,
        properties: {
          category: {
            type: "string",
            enum: ["HUBSPOT_DEFINED", "USER_DEFINED"],
          },
          typeId: { type: "integer" },
          label: { type: ["string", "null"] as string[] },
        },
        required: ["category", "typeId", "label"],
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
          associationSpec: {
            type: "object" as const,
            properties: {
              associationCategory: {
                type: "string",
                enum: [
                  "HUBSPOT_DEFINED",
                  "INTEGRATOR_DEFINED",
                  "USER_DEFINED",
                  "WORK",
                ],
              },
              associationTypeId: { type: "integer" },
            },
          },
        },
      },
    },
    numErrors: { type: ["integer", "null"] as string[] },
    errors: { type: ["array", "null"] as string[] },
    links: { type: ["object", "null"] as string[] },
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
              required: ["toObjectId", "associationTypes"],
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
            },
          },
        },
      },
    },
    numErrors: { type: ["integer", "null"] as string[] },
    errors: { type: ["array", "null"] as string[] },
    links: { type: ["object", "null"] as string[] },
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
    errors: { type: ["array", "null"] as string[] },
    links: { type: ["object", "null"] as string[] },
    requestedAt: { type: ["string", "null"] as string[], format: "date-time" },
  },
  required: ["completedAt", "startedAt", "status", "results"],
};
