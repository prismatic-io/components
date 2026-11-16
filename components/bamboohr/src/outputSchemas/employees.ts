const nullableStringSchema = { type: ["string", "null"] };

export const getEmployeeOutputSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
    employeeNumber: nullableStringSchema,
    firstName: nullableStringSchema,
    lastName: nullableStringSchema,
    middleName: nullableStringSchema,
    status: {
      type: ["string", "null"],
      enum: ["Active", "Inactive", null],
    },
    workEmail: nullableStringSchema,
    bestEmail: nullableStringSchema,
    workPhone: nullableStringSchema,
    mobilePhone: nullableStringSchema,
    hireDate: nullableStringSchema,
    originalHireDate: nullableStringSchema,
    terminationDate: nullableStringSchema,
    address1: nullableStringSchema,
    city: nullableStringSchema,
    state: nullableStringSchema,
    country: nullableStringSchema,
    gender: nullableStringSchema,
    payRate: nullableStringSchema,
    payType: nullableStringSchema,
    exempt: nullableStringSchema,
    division: nullableStringSchema,
    department: nullableStringSchema,
    location: nullableStringSchema,
  },
  required: ["id"],
  additionalProperties: true,
};

export const getEmployeeDirectoryOutputSchema = {
  type: "object" as const,
  properties: {
    fields: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          type: { type: "string" },
          name: { type: "string" },
        },
      },
    },
    employees: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          canUploadPhoto: { type: "integer", enum: [0, 1] },
        },
        additionalProperties: true,
      },
    },
  },
};
