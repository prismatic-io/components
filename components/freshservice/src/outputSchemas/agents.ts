import { customFieldsSchema } from "./common";
export const agentSchema = {
  type: "object" as const,
  properties: {
    id: { type: "number" },
    first_name: { type: "string" },
    last_name: { type: "string" },
    occasional: { type: "boolean" },
    active: { type: "boolean" },
    job_title: { type: "string" },
    email: { type: "string", format: "email" },
    work_phone_number: { type: "string" },
    mobile_phone_number: { type: "string" },
    department_ids: { type: "array", items: { type: "number" } },
    can_see_all_tickets_from_associated_departments: { type: "boolean" },
    reporting_manager_id: { type: "number" },
    address: { type: "string" },
    time_zone: { type: "string" },
    time_format: { type: "string", enum: ["12h", "24h"] },
    language: { type: "string" },
    location_id: { type: "number" },
    background_information: { type: "string" },
    scoreboard_level_id: {
      type: ["number", "null"],
      enum: [1, 2, 3, 4, 5, 6, null],
    },
    member_of: { type: "array", items: { type: "number" } },
    observer_of: { type: "array", items: { type: "number" } },
    member_of_pending_approval: { type: "array", items: { type: "number" } },
    observer_of_pending_approval: { type: "array", items: { type: "number" } },
    roles: {
      type: "array",
      items: {
        type: "object",
        properties: {
          role_id: { type: "number" },
          assignment_scope: { type: "string" },
          groups: { type: "array" },
        },
      },
    },
    last_login_at: { type: ["string", "null"], format: "date-time" },
    last_active_at: { type: ["string", "null"], format: "date-time" },
    custom_fields: customFieldsSchema,
    has_logged_in: { type: "boolean" },
    created_at: { type: "string", format: "date-time" },
    updated_at: { type: "string", format: "date-time" },
    belongs_to_workspace_ids: { type: "array", items: { type: "number" } },
    workspace_ids: { type: "array", items: { type: "number" } },
    api_key_enabled: { type: "boolean" },
    workspace_info: { type: "array" },
  },
  required: ["id"],
  additionalProperties: false,
};
export const agentOutputSchema = {
  type: "object" as const,
  properties: {
    agent: agentSchema,
  },
  required: ["agent"],
  additionalProperties: false,
};
export const listAgentsOutputSchema = {
  type: "object" as const,
  properties: {
    agents: { type: "array", items: agentSchema },
  },
  required: ["agents"],
  additionalProperties: false,
};
