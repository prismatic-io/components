import { input } from "@prismatic-io/spectral";
import { cleanId } from "../util/transforms";
import {
  connection,
  effectiveDate,
  fetchAll,
  includeMetadataLinks,
  pagination,
} from "./common";
const departmentId = input({
  label: "Department ID",
  type: "string",
  required: true,
  dataSource: "selectDepartment",
  comments:
    "The unique numeric identifier for the Oracle HCM department (OrganizationId).",
  placeholder: "Enter department ID",
  example: "300100012345678",
  clean: cleanId,
});
export const getDepartmentInputs = {
  connection,
  effectiveDate,
  departmentId,
  includeMetadataLinks,
};
export const listDepartmentsInputs = {
  connection,
  fetchAll,
  pagination,
  effectiveDate,
  includeMetadataLinks,
};
