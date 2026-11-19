import { locationSchema, responseHeadersSchema } from "./shared";

const hourlyCompensationSchema = {
  type: "object" as const,
  properties: {
    uuid: { type: ["string", "null"] },
    name: { type: "string" },
    multiple: { type: "number" },
  },
};

const fixedCompensationSchema = {
  type: "object" as const,
  properties: {
    uuid: { type: ["string", "null"] },
    name: { type: "string" },
  },
};

const compensationsSchema = {
  type: "object" as const,
  properties: {
    hourly: { type: "array", items: hourlyCompensationSchema },
    fixed: { type: "array", items: fixedCompensationSchema },
    paid_time_off: { type: "array", items: fixedCompensationSchema },
  },
};

const primarySignatorySchema = {
  type: "object" as const,
  properties: {
    uuid: { type: "string" },
    first_name: { type: "string" },
    middle_initial: { type: "string" },
    last_name: { type: "string" },
    phone: { type: "string" },
    email: { type: "string" },
    home_address: {
      type: "object" as const,
      properties: {
        street_1: { type: "string" },
        street_2: { type: ["string", "null"] },
        city: { type: "string" },
        state: { type: "string" },
        zip: { type: "string" },
        country: { type: "string" },
      },
    },
  },
};

const primaryPayrollAdminSchema = {
  type: "object" as const,
  properties: {
    first_name: { type: "string" },
    last_name: { type: "string" },
    phone: { type: "string" },
    email: { type: "string" },
  },
};

export const companySchema = {
  type: "object" as const,
  properties: {
    uuid: { type: "string" },
    name: { type: "string" },
    trade_name: { type: ["string", "null"] },
    is_partner_managed: { type: "boolean" },
    tier: { type: "string" },
    locations: { type: "array", items: locationSchema },
    ein: { type: "string" },
    entity_type: { type: "string" },
    pay_schedule_type: { type: "string" },
    join_date: { type: "string" },
    funding_type: { type: "string" },
    slug: { type: "string" },
    is_suspended: { type: "boolean" },
    company_status: { type: "string" },
    is_high_risk_business: { type: "boolean" },
    is_marijuana_business: { type: "boolean" },
    contractor_only: { type: "boolean" },
    compensations: compensationsSchema,
    primary_signatory: primarySignatorySchema,
    primary_payroll_admin: primaryPayrollAdminSchema,
  },
  required: ["uuid"],
};

export const companyAdminSchema = {
  type: "object" as const,
  properties: {
    uuid: { type: "string" },
    first_name: { type: "string" },
    last_name: { type: "string" },
    email: { type: "string" },
    phone: { type: ["string", "null"] },
  },
  required: ["uuid"],
};

export const listCompaniesOutputSchema = {
  type: "object" as const,
  properties: {
    data: { type: "array", items: companySchema },
    headers: responseHeadersSchema,
  },
  required: ["data"],
};

export const getCompanyOutputSchema = {
  type: "object" as const,
  properties: {
    data: companySchema,
    headers: responseHeadersSchema,
  },
  required: ["data"],
};

export const listCompanyAdminsOutputSchema = {
  type: "object" as const,
  properties: {
    data: { type: "array", items: companyAdminSchema },
    headers: responseHeadersSchema,
  },
  required: ["data"],
};
