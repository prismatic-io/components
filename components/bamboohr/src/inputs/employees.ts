import { input, type KeyValuePair, util } from "@prismatic-io/spectral";
import { employeeFields, validateEmployeeFields } from "../util";
import { connectionInput, employeeId } from "./common";

const firstName = input({
  label: "First Name",
  type: "string",
  required: true,
  comments: "The given name of the employee being created.",
  placeholder: "Enter first name",
  example: "John",
  clean: util.types.toString,
});

const lastName = input({
  label: "Last Name",
  type: "string",
  required: true,
  comments: "The family name of the employee being created.",
  placeholder: "Enter last name",
  example: "Doe",
  clean: util.types.toString,
});

const employeeFieldValues = input({
  label: "Employee Fields",
  type: "string",
  collection: "keyvaluelist",
  required: false,
  comments: `The names of the fields and their values to use when creating/updating a record. Possible fields are: ${employeeFields.join(
    ", ",
  )}.`,
  clean: (values: unknown) =>
    validateEmployeeFields(values as KeyValuePair<unknown>[]),
});

export const getEmployeeInputs = {
  connection: connectionInput,
  employeeId,
};

export const addEmployeeInputs = {
  connection: connectionInput,
  firstName,
  lastName,
  employeeFieldValues,
};

export const updateEmployeeInputs = {
  connection: connectionInput,
  employeeId,
  employeeFieldValues,
};

export const getEmployeeDirectoryInputs = {
  connection: connectionInput,
};
