import { addressSchema, responseHeadersSchema } from "./shared";

const jobCompensationSchema = {
  type: "object" as const,
  properties: {
    uuid: { type: "string" },
    employee_uuid: { type: "string" },
    version: { type: "string" },
    payment_unit: { type: "string" },
    flsa_status: { type: "string" },
    adjust_for_minimum_wage: { type: "boolean" },
    minimum_wages: { type: "array", items: { type: "object" as const } },
    job_uuid: { type: "string" },
    effective_date: { type: "string" },
    rate: { type: "string" },
  },
};

const jobSchema = {
  type: "object" as const,
  properties: {
    uuid: { type: "string" },
    version: { type: "string" },
    employee_uuid: { type: "string" },
    current_compensation_uuid: { type: "string" },
    payment_unit: { type: "string" },
    primary: { type: "boolean" },
    two_percent_shareholder: { type: "boolean" },
    state_wc_covered: { type: ["boolean", "null"] },
    state_wc_class_code: { type: ["string", "null"] },
    title: { type: "string" },
    compensations: { type: "array", items: jobCompensationSchema },
    rate: { type: "string" },
    hire_date: { type: "string" },
  },
};

const onboardingDocumentsConfigSchema = {
  type: "object" as const,
  properties: {
    uuid: { type: ["string", "null"] },
    i9_document: { type: "boolean" },
  },
};

const memberPortalInvitationStatusSchema = {
  type: "object" as const,
  properties: {
    status: { type: "string" },
    token_expired: { type: "boolean" },
    welcome_email_sent_at: { type: ["string", "null"] },
    last_password_resent_at: { type: ["string", "null"] },
  },
};

export const employeeSchema = {
  type: "object" as const,
  properties: {
    uuid: { type: "string" },
    first_name: { type: "string" },
    middle_initial: { type: ["string", "null"] },
    last_name: { type: "string" },
    email: { type: ["string", "null"] },
    company_uuid: { type: "string" },
    manager_uuid: { type: ["string", "null"] },
    version: { type: "string" },
    current_employment_status: { type: "string" },
    onboarding_status: { type: "string" },
    preferred_first_name: { type: ["string", "null"] },
    department_uuid: { type: ["string", "null"] },
    employee_code: { type: ["string", "null"] },
    payment_method: { type: "string" },
    department: { type: ["string", "null"] },
    terminated: { type: "boolean" },
    two_percent_shareholder: { type: "boolean" },
    onboarded: { type: "boolean" },
    historical: { type: "boolean" },
    has_ssn: { type: "boolean" },
    onboarding_documents_config: onboardingDocumentsConfigSchema,
    jobs: { type: "array", items: jobSchema },
    eligible_paid_time_off: {
      type: "array",
      items: { type: "object" as const },
    },
    terminations: { type: "array", items: { type: "object" as const } },
    garnishments: { type: "array", items: { type: "object" as const } },
    date_of_birth: { type: "string" },
    ssn: { type: "string" },
    phone: { type: ["string", "null"] },
    work_email: { type: ["string", "null"] },
    current_home_address: addressSchema,
    all_home_addresses: { type: "array", items: addressSchema },
    member_portal_invitation_status: memberPortalInvitationStatusSchema,
    partner_portal_invitation_sent: { type: "boolean" },
  },
  required: ["uuid"],
};

export const listEmployeesOutputSchema = {
  type: "object" as const,
  properties: {
    data: { type: "array", items: employeeSchema },
    headers: responseHeadersSchema,
  },
  required: ["data"],
};

export const getEmployeeOutputSchema = {
  type: "object" as const,
  properties: {
    data: employeeSchema,
    headers: responseHeadersSchema,
  },
  required: ["data"],
};

export const createEmployeeOutputSchema = {
  type: "object" as const,
  properties: {
    data: employeeSchema,
    headers: responseHeadersSchema,
  },
  required: ["data"],
};

export const findEmployeeByEmailOutputSchema = {
  type: "object" as const,
  properties: {
    data: employeeSchema,
    headers: responseHeadersSchema,
  },
  required: ["data"],
};
