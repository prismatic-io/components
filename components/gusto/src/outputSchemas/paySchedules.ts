import { responseHeadersSchema } from "./shared";

export const payScheduleSchema = {
  type: "object" as const,
  properties: {
    uuid: { type: "string" },
    version: { type: "string" },
    frequency: { type: "string" },
    anchor_pay_date: { type: "string" },
    anchor_end_of_pay_period: { type: "string" },
    day_1: { type: ["number", "null"] },
    day_2: { type: ["number", "null"] },
    name: { type: ["string", "null"] },
    custom_name: { type: ["string", "null"] },
    auto_pilot: { type: "boolean" },
    active: { type: "boolean" },
    auto_payroll_enablement_blockers: { type: ["array", "null"] },
  },
  required: ["uuid"],
};

export const listPaySchedulesOutputSchema = {
  type: "object" as const,
  properties: {
    data: { type: "array", items: payScheduleSchema },
    headers: responseHeadersSchema,
  },
  required: ["data"],
};

export const getPayScheduleOutputSchema = {
  type: "object" as const,
  properties: {
    data: { type: "array", items: payScheduleSchema },
    headers: responseHeadersSchema,
  },
  required: ["data"],
};
