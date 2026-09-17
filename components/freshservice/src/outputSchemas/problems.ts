import { customFieldsSchema } from "./common";
const problemBaseProperties = {
  id: { type: "number" },
  workspace_id: { type: "number" },
  agent_id: { type: ["number", "null"] },
  requester_id: { type: "number" },
  description: { type: "string" },
  description_text: { type: "string" },
  due_by: { type: "string", format: "date-time" },
  subject: { type: "string" },
  group_id: { type: ["number", "null"] },
  priority: { type: "number", enum: [1, 2, 3, 4] },
  impact: { type: "number", enum: [1, 2, 3] },
  status: { type: "number", enum: [1, 2, 3] },
  known_error: { type: "boolean" },
  department_id: { type: ["number", "null"] },
  category: { type: ["string", "null"] },
  sub_category: { type: ["string", "null"] },
  item_category: { type: ["string", "null"] },
  created_at: { type: "string", format: "date-time" },
  updated_at: { type: "string", format: "date-time" },
  assets: { type: "array" },
  associated_change: {},
  custom_fields: customFieldsSchema,
};
const analysisFieldSchema = {
  type: "object" as const,
  properties: {
    description: { type: "string" },
    description_text: { type: "string" },
  },
};
export const problemOutputSchema = {
  type: "object" as const,
  properties: {
    problem: {
      type: "object",
      properties: {
        ...problemBaseProperties,
        analysis_fields: {
          type: "object",
          properties: {
            problem_cause: analysisFieldSchema,
            problem_symptom: analysisFieldSchema,
            problem_impact: analysisFieldSchema,
          },
        },
      },
      required: ["id"],
      additionalProperties: false,
    },
  },
  required: ["problem"],
  additionalProperties: false,
};
export const listProblemsOutputSchema = {
  type: "object" as const,
  properties: {
    problems: {
      type: "array",
      items: {
        type: "object",
        properties: { ...problemBaseProperties },
        required: ["id"],
        additionalProperties: false,
      },
    },
  },
  required: ["problems"],
  additionalProperties: false,
};
