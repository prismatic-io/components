import { util } from "@prismatic-io/spectral";
import type { DirectoryEmployee } from "../types";

export const toEmployeeLabel = (employee: DirectoryEmployee): string => {
  const displayName = util.types.toString(employee.displayName);
  if (displayName !== "") {
    return displayName;
  }
  const fullName =
    `${util.types.toString(employee.firstName)} ${util.types.toString(employee.lastName)}`.trim();
  return fullName !== ""
    ? fullName
    : `Employee ID: ${util.types.toString(employee.id)}`;
};
