import { identitySetSchema, deleteResultSchema } from "./common";
const plannerAssignmentSchema = {
  type: "object" as const,
  properties: {
    "@odata.type": { type: "string" },
    assignedBy: identitySetSchema,
    assignedDateTime: { type: "string", format: "date-time" },
    orderHint: { type: "string" },
  },
};
export const plannerTaskSchema = {
  type: "object" as const,
  properties: {
    "@odata.etag": { type: "string" },
    id: { type: "string" },
    title: { type: "string" },
    planId: { type: "string" },
    bucketId: { type: "string" },
    orderHint: { type: "string" },
    assigneePriority: { type: "string" },
    percentComplete: { type: "integer" },
    priority: { type: "integer" },
    previewType: {
      type: "string",
      enum: ["automatic", "noPreview", "checklist", "description", "reference"],
    },
    hasDescription: { type: "boolean" },
    activeChecklistItemCount: { type: "integer" },
    checklistItemCount: { type: "integer" },
    referenceCount: { type: "integer" },
    conversationThreadId: { type: ["string", "null"] },
    startDateTime: { type: ["string", "null"], format: "date-time" },
    dueDateTime: { type: ["string", "null"], format: "date-time" },
    completedDateTime: { type: ["string", "null"], format: "date-time" },
    createdDateTime: { type: "string", format: "date-time" },
    createdBy: identitySetSchema,
    completedBy: { ...identitySetSchema, type: ["object", "null"] },
    appliedCategories: {
      type: "object",
      properties: {
        category1: { type: "boolean" },
        category2: { type: "boolean" },
        category3: { type: "boolean" },
        category4: { type: "boolean" },
        category5: { type: "boolean" },
        category6: { type: "boolean" },
      },
      additionalProperties: { type: "boolean" },
    },
    assignments: {
      type: "object",
      additionalProperties: plannerAssignmentSchema,
    },
  },
  required: ["id"],
};
export const plannerTaskCollectionSchema = {
  type: "object" as const,
  properties: {
    "@odata.context": { type: "string" },
    value: { type: "array", items: plannerTaskSchema },
    truncated: { type: "boolean" },
  },
  required: ["value", "truncated"],
};
const plannerChecklistItemSchema = {
  type: "object" as const,
  properties: {
    "@odata.type": { type: "string" },
    title: { type: "string" },
    isChecked: { type: "boolean" },
    orderHint: { type: "string" },
    lastModifiedBy: identitySetSchema,
    lastModifiedDateTime: { type: "string", format: "date-time" },
  },
};
const plannerExternalReferenceSchema = {
  type: "object" as const,
  properties: {
    "@odata.type": { type: "string" },
    alias: { type: "string" },
    type: { type: "string", enum: ["PowerPoint", "Word", "Excel", "Other"] },
    previewPriority: { type: "string" },
    lastModifiedBy: identitySetSchema,
    lastModifiedDateTime: { type: "string", format: "date-time" },
  },
};
export const plannerTaskDetailsSchema = {
  type: "object" as const,
  properties: {
    "@odata.etag": { type: "string" },
    id: { type: "string" },
    description: { type: "string" },
    previewType: {
      type: "string",
      enum: ["automatic", "noPreview", "checklist", "description", "reference"],
    },
    checklist: {
      type: "object",
      additionalProperties: plannerChecklistItemSchema,
    },
    references: {
      type: "object",
      additionalProperties: plannerExternalReferenceSchema,
    },
  },
  required: ["id"],
};
export const listTasksInPlanOutputSchema = plannerTaskCollectionSchema;
export const listTasksInBucketOutputSchema = plannerTaskCollectionSchema;
export const listTasksForUserOutputSchema = plannerTaskCollectionSchema;
export const getTaskOutputSchema = plannerTaskSchema;
export const updateTaskOutputSchema = plannerTaskSchema;
export const completeTaskOutputSchema = plannerTaskSchema;
export const assignTaskOutputSchema = plannerTaskSchema;
export const moveTaskToBucketOutputSchema = plannerTaskSchema;
export const getTaskDetailsOutputSchema = plannerTaskDetailsSchema;
export const updateTaskDetailsOutputSchema = plannerTaskDetailsSchema;
export const createTaskOutputSchema = {
  type: "object" as const,
  properties: {
    task: plannerTaskSchema,
    details: { ...plannerTaskDetailsSchema, type: ["object", "null"] },
  },
  required: ["task", "details"],
};
export const deleteTaskOutputSchema = deleteResultSchema;
