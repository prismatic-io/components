import { createEmployee } from "./create";
import { getEmployee } from "./get";
import { getEmployeeCompensations } from "./getCompensations";
import { getEmployeeCustomFields } from "./getCustomFields";
import { getTerminatedEmployee } from "./getTerminated";
import { listEmployees } from "./list";
import { listTerminatedEmployees } from "./listTerminated";
import { rehireEmployee } from "./rehire";
import { terminateEmployee } from "./terminate";
import { updateEmployee } from "./update";
import { updateEmployeeCustomField } from "./updateCustomField";

export default {
  createEmployee,
  getEmployee,
  getEmployeeCompensations,
  getEmployeeCustomFields,
  getTerminatedEmployee,
  listEmployees,
  listTerminatedEmployees,
  rehireEmployee,
  terminateEmployee,
  updateEmployee,
  updateEmployeeCustomField,
};
