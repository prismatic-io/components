import { responseHeadersSchema } from "./shared";

export const terminationSchema = {
  type: "object" as const,
  properties: {
    uuid: { type: "string" },
    employee_uuid: { type: "string" },
    active: { type: "boolean" },
    effective_date: { type: "string" },
    run_termination_payroll: { type: "boolean" },
  },
  required: ["uuid"],
};

export const terminateEmployeeOutputSchema = {
  type: "object" as const,
  properties: {
    data: terminationSchema,
    headers: responseHeadersSchema,
  },
  required: ["data"],
};
