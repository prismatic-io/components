import { pageSchema } from "./shared";
const departmentSchema = {
  type: "object" as const,
  properties: {
    id: {
      type: "string",
      format: "uuid",
    },
    name: {
      type: "string",
    },
  },
  required: ["id", "name"],
};
export const createDepartmentOutputSchema = departmentSchema;
export const getDepartmentOutputSchema = departmentSchema;
export const listDepartmentsOutputSchema = {
  type: "object" as const,
  properties: {
    data: {
      type: "array",
      items: departmentSchema,
    },
    page: pageSchema,
  },
  required: ["data", "page"],
};
export const updateDepartmentOutputSchema = departmentSchema;
