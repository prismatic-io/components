import { responseEnvelopeSchema } from "./common";

export const policySummarySchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    type: { type: "string" },
    role: { type: "string" },
    owner: { type: "string", format: "email" },
    outputCurrency: { type: "string" },
  },
};

export const policyInfoSchema = {
  type: "object" as const,
  properties: {
    categories: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: { type: "string" },
          enabled: { type: "boolean" },
          areCommentsRequired: { type: "boolean" },
        },
      },
    },
    reportFields: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: { type: "string" },
          type: { type: "string" },
          values: { type: "array", items: { type: "string" } },
        },
      },
    },
    tags: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: { type: "string" },
          enabled: { type: "boolean" },
          glCode: { type: "string" },
          tags: { type: "array" },
        },
      },
    },
    tax: {
      type: "object",
      properties: {
        name: { type: "string" },
        default: { type: "string" },
        rates: {
          type: "array",
          items: {
            type: "object",
            properties: {
              rateID: { type: "string" },
              name: { type: "string" },
              rate: { type: "number" },
            },
          },
        },
      },
    },
    employees: {
      type: "array",
      items: {
        type: "object",
        properties: {
          email: { type: "string", format: "email" },
          role: { type: "string" },
          submitsTo: { type: "string", format: "email" },
          employeeID: { type: "string" },
        },
        additionalProperties: true,
      },
    },
  },
  required: [],
  additionalProperties: true,
};

export const listPoliciesOutputSchema = {
  type: "object" as const,
  properties: {
    ...responseEnvelopeSchema.properties,
    policyList: { type: "array", items: policySummarySchema },
  },
  required: ["responseCode"],
};

export const getPolicyOutputSchema = {
  type: "object" as const,
  properties: {
    ...responseEnvelopeSchema.properties,
    policyInfo: {
      type: "object",
      additionalProperties: policyInfoSchema,
    },
  },
  required: ["responseCode"],
};

export const createPolicyOutputSchema = {
  type: "object" as const,
  properties: {
    ...responseEnvelopeSchema.properties,
    policyID: { type: "string" },
    policyName: { type: "string" },
  },
  required: ["responseCode"],
};

export const updatePolicyOutputSchema = {
  type: "object" as const,
  properties: {
    ...responseEnvelopeSchema.properties,
  },
  required: ["responseCode"],
};
