import { companySchema, idOnlySchema, successStringSchema } from "./shared";
export const listCompaniesOutputSchema = {
  type: "object" as const,
  properties: {
    companies: { type: "array", items: companySchema },
    hasNextPage: { type: "boolean" },
    cursor: { type: "string" },
  },
  required: ["companies", "hasNextPage", "cursor"],
  additionalProperties: true,
};
export const updateCompanyOutputSchema = idOnlySchema;
export const deleteCompanyOutputSchema = successStringSchema;
