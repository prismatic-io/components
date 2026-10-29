import { identitySetSchema, deleteResultSchema } from "./common";
export const plannerPlanSchema = {
  type: "object" as const,
  properties: {
    "@odata.etag": { type: "string" },
    id: { type: "string" },
    title: { type: "string" },
    owner: { type: "string" },
    container: {
      type: "object",
      properties: {
        containerId: { type: "string" },
        type: { type: "string" },
        url: { type: "string" },
      },
    },
    createdBy: identitySetSchema,
    createdDateTime: { type: "string", format: "date-time" },
  },
  required: ["id"],
};
export const plannerPlanCollectionSchema = {
  type: "object" as const,
  properties: {
    "@odata.context": { type: "string" },
    value: { type: "array", items: plannerPlanSchema },
    truncated: { type: "boolean" },
  },
  required: ["value", "truncated"],
};
export const listPlansInGroupOutputSchema = plannerPlanCollectionSchema;
export const listPlansForUserOutputSchema = plannerPlanCollectionSchema;
export const getPlanOutputSchema = plannerPlanSchema;
export const createPlanOutputSchema = plannerPlanSchema;
export const updatePlanOutputSchema = plannerPlanSchema;
export const plannerPlanDetailsSchema = {
  type: "object" as const,
  properties: {
    "@odata.etag": { type: "string" },
    id: { type: "string" },
    categoryDescriptions: {
      type: "object",
      properties: {
        category1: { type: ["string", "null"] },
        category2: { type: ["string", "null"] },
        category3: { type: ["string", "null"] },
        category4: { type: ["string", "null"] },
        category5: { type: ["string", "null"] },
        category6: { type: ["string", "null"] },
        category7: { type: ["string", "null"] },
        category8: { type: ["string", "null"] },
        category9: { type: ["string", "null"] },
        category10: { type: ["string", "null"] },
        category11: { type: ["string", "null"] },
        category12: { type: ["string", "null"] },
        category13: { type: ["string", "null"] },
        category14: { type: ["string", "null"] },
        category15: { type: ["string", "null"] },
        category16: { type: ["string", "null"] },
        category17: { type: ["string", "null"] },
        category18: { type: ["string", "null"] },
        category19: { type: ["string", "null"] },
        category20: { type: ["string", "null"] },
        category21: { type: ["string", "null"] },
        category22: { type: ["string", "null"] },
        category23: { type: ["string", "null"] },
        category24: { type: ["string", "null"] },
        category25: { type: ["string", "null"] },
      },
    },
    sharedWith: {
      type: "object",
      additionalProperties: { type: "boolean" },
    },
  },
  required: ["id"],
};
export const getPlanDetailsOutputSchema = plannerPlanDetailsSchema;
export const updatePlanDetailsOutputSchema = plannerPlanDetailsSchema;
export const deletePlanOutputSchema = deleteResultSchema;
