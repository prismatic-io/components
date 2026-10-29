import type { Element } from "@prismatic-io/spectral";
import type { Department, JamfCreateResponse, PagedResponse } from "../types";

export const getDepartmentExamplePayload: { data: Department } = {
  data: { id: "10", name: "Information Technology" },
};

export const listDepartmentsExamplePayload: {
  data: PagedResponse<Department>;
} = {
  data: {
    results: [getDepartmentExamplePayload.data],
    totalCount: 1,
  },
};

export const createDepartmentExamplePayload: { data: JamfCreateResponse } = {
  data: {
    id: "11",
    href: "https://your-instance.jamfcloud.com/api/v1/departments/11",
  },
};

export const updateDepartmentExamplePayload: { data: Department } = {
  data: { id: "10", name: "Information Technology" },
};

export const deleteDepartmentExamplePayload: { data: string } = {
  data: "Successfully deleted department 10",
};

export const selectDepartmentExamplePayload: { result: Element[] } = {
  result: [{ key: "10", label: "Information Technology" }],
};
