import { input, util } from "@prismatic-io/spectral";
import { connectionInput, employeeIdInput } from "./common";

const terminationDateInput = input({
  label: "Termination Date",
  required: true,
  type: "string",
  placeholder: "Enter termination date",
  comments: "The date the employee was terminated.",
  clean: util.types.toString,
  example: "2020-12-30",
});

const runTerminationPayrollInput = input({
  label: "Run Termination Payroll?",
  required: true,
  type: "boolean",
  comments: "Whether to run a termination payroll for the employee.",
  clean: util.types.toBool,
});

export const terminateEmployeeInputs = {
  connection: connectionInput,
  employeeId: employeeIdInput,
  terminationDate: terminationDateInput,
  runTerminationPayroll: runTerminationPayrollInput,
};
