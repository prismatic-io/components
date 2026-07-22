import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import {
  connection,
  fetchAll,
  filter,
  page,
  pageSize,
  resourceId,
  sort,
} from "./common";
const departmentName = input({
  label: "Name",
  type: "string",
  required: true,
  comments: "The display name used to identify the department in Jamf Pro.",
  clean: util.types.toString,
  placeholder: "Enter department name",
  example: "Information Technology",
});
const departmentResourceId = {
  ...resourceId,
  label: "Department",
  comments: "The unique identifier of the department.",
  dataSource: "selectDepartment",
};
export const createDepartmentInputs = { connection, departmentName };
export const deleteDepartmentInputs = {
  connection,
  resourceId: departmentResourceId,
};
export const getDepartmentInputs = {
  connection,
  resourceId: departmentResourceId,
};
const pagination = structuredObjectInput({
  label: "Pagination",
  required: false,
  comments: "Page and page-size controls.",
  inputs: { page, pageSize },
});
export const listDepartmentsInputs = {
  connection,
  fetchAll,
  pagination,
  sort,
  filter,
};
export const updateDepartmentInputs = {
  connection,
  resourceId: departmentResourceId,
  departmentName,
};
