import { input, util } from "@prismatic-io/spectral";
import {
  categoryId,
  categoryName,
  connectionInput,
  employeeId,
  file,
  fileName,
  share,
} from "./common";

const employeeFileId = input({
  label: "Employee File ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the employee file.",
  placeholder: "Enter employee file ID",
  example: "456",
  clean: util.types.toString,
  dataSource: "selectEmployeeFile",
});

export const listEmployeeFilesInputs = {
  connection: connectionInput,
  employeeId,
};

export const addEmployeeFileCategoryInputs = {
  connection: connectionInput,
  categoryName,
};

export const deleteEmployeeFileInputs = {
  connection: connectionInput,
  employeeId,
  employeeFileId,
};

export const getEmployeeFileInputs = {
  connection: connectionInput,
  employeeId,
  employeeFileId,
};

export const uploadEmployeeFileInputs = {
  connection: connectionInput,
  employeeId,
  categoryId,
  fileName,
  file,
  share,
};
