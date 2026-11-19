export const responseHeadersSchema = {
  type: "object" as const,
  additionalProperties: { type: "string" },
};

export const locationSchema = {
  type: "object" as const,
  properties: {
    street_1: { type: "string" },
    street_2: { type: ["string", "null"] },
    city: { type: "string" },
    state: { type: "string" },
    zip: { type: "string" },
    country: { type: "string" },
    active: { type: "boolean" },
  },
};

export const addressSchema = {
  type: "object" as const,
  properties: {
    street_1: { type: "string" },
    street_2: { type: ["string", "null"] },
    city: { type: "string" },
    state: { type: "string" },
    zip: { type: "string" },
    country: { type: "string" },
    active: { type: "boolean" },
    uiud: { type: "string" },
  },
};
