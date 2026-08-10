import type { Element } from "@prismatic-io/spectral";
import type { Department, OracleHcmListResponse } from "../types";
const departmentExample: Department = {
  OrganizationId: 300100012340002,
  Name: "Engineering",
  OrganizationCode: "ENG",
  Status: "A",
  EffectiveStartDate: "2020-01-01",
  EffectiveEndDate: null,
  LastUpdateDate: "2024-01-15T08:00:00.000Z",
};
export const listDepartmentsExamplePayload: {
  data: OracleHcmListResponse<Department>;
} = {
  data: {
    items: [departmentExample],
    count: 1,
    hasMore: false,
    limit: 25,
    offset: 0,
  },
};
export const getDepartmentExamplePayload: {
  data: Department;
} = { data: departmentExample };
export const selectDepartmentExamplePayload: {
  result: Element[];
} = {
  result: [{ key: "300100012340002", label: "Engineering" }],
};
