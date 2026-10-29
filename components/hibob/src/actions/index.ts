import {
  createCustomTableEntry,
  deleteCustomTableEntry,
  getCustomTableMetadata,
  updateCustomTableEntry,
} from "./customTable";
import {
  createEmployee,
  downloadEmployeeDocuments,
  getEmployeeTasks,
  listEmployeeFields,
  readEmployeeFields,
  revokeEmployeeAccess,
  searchEmployee,
  terminateEmployee,
  updateEmployee,
  updateEmployeeEmail,
} from "./employee";
import { createNewField, deleteField, updateField } from "./field";
import {
  deleteFileFromFolder,
  listFolders,
  uploadFileFromUrl,
  uploadFileToFolder,
} from "./file";
import {
  addListItem,
  deleteListItem,
  getCompanyList,
  listCompanyLists,
  updateListItem,
} from "./list";
import { rawRequest } from "./misc";
import { completeTask, listOpenTasks } from "./task";

export default {
  searchEmployee,
  readEmployeeFields,
  updateEmployee,
  createEmployee,
  revokeEmployeeAccess,
  terminateEmployee,
  updateEmployeeEmail,
  listEmployeeFields,
  createNewField,
  updateField,
  deleteField,
  listCompanyLists,
  getCompanyList,
  addListItem,
  updateListItem,
  deleteListItem,
  getCustomTableMetadata,
  createCustomTableEntry,
  updateCustomTableEntry,
  deleteCustomTableEntry,
  listFolders,
  downloadEmployeeDocuments,
  uploadFileFromUrl,
  uploadFileToFolder,
  deleteFileFromFolder,
  listOpenTasks,
  getEmployeeTasks,
  completeTask,
  rawRequest,
};
