import { input, util } from "@prismatic-io/spectral";

export const connection = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The HiBob connection to use.",
});

export const employeeId = input({
  label: "Employee ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the employee.",
  example: "employee_123",
  dataSource: "selectEmployee",
  placeholder: "Enter employee ID",
  clean: util.types.toString,
});
