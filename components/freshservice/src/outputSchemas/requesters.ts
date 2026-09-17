import { customFieldsSchema } from "./common";
export const requesterSchema = {
  type: "object" as const,
  properties: {
    id: { type: "number" },
    is_agent: { type: "boolean" },
    belongs_to_workspace_ids: { type: "array", items: { type: "number" } },
    first_name: { type: "string" },
    last_name: { type: "string" },
    job_title: { type: "string" },
    primary_email: { type: "string", format: "email" },
    secondary_emails: { type: "array", items: { type: "string" } },
    work_phone_number: { type: "string" },
    mobile_phone_number: { type: "string" },
    can_see_all_tickets_from_associated_workspace_ids: { type: "array" },
    department_ids: { type: "array", items: { type: "number" } },
    can_see_all_tickets_from_associated_departments: { type: "boolean" },
    reporting_manager_id: { type: "number" },
    address: { type: "string" },
    time_zone: { type: "string" },
    time_format: { type: "string" },
    language: { type: "string" },
    location_id: { type: "number" },
    background_information: { type: "string" },
    custom_fields: customFieldsSchema,
    active: { type: "boolean" },
    has_logged_in: { type: "boolean" },
    created_at: { type: "string", format: "date-time" },
    updated_at: { type: "string", format: "date-time" },
    external_id: { type: "string" },
  },
  required: ["id"],
  additionalProperties: false,
};
export const requesterOutputSchema = {
  type: "object" as const,
  properties: {
    requester: requesterSchema,
  },
  required: ["requester"],
  additionalProperties: false,
};
export const listRequestersOutputSchema = {
  type: "object" as const,
  properties: {
    requesters: { type: "array", items: requesterSchema },
  },
  required: ["requesters"],
  additionalProperties: false,
};
