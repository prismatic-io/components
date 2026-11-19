import { input, util } from "@prismatic-io/spectral";
import { toOptionalString } from "../util/clean";
import {
  additionalFieldsInput,
  companyIdInput,
  connectionInput,
  employeeIdInput,
  fetchAll,
  paginationPageInput,
} from "./common";

const firstNameInput = input({
  label: "First Name",
  required: true,
  type: "string",
  placeholder: "Enter first name",
  comments: "The employee's first name.",
  clean: util.types.toString,
});

const middleInitialInput = input({
  label: "Middle Initial",
  required: false,
  type: "string",
  placeholder: "Enter middle initial",
  comments: "The employee's middle initial.",
  clean: toOptionalString,
});

const lastNameInput = input({
  label: "Last Name",
  required: true,
  type: "string",
  placeholder: "Enter last name",
  comments: "The employee's last name.",
  clean: util.types.toString,
});

const dateOfBirthInput = input({
  label: "Date of Birth",
  required: false,
  type: "string",
  placeholder: "Enter date of birth",
  comments: "The employee's date of birth.",
  clean: toOptionalString,
  example: "1990-12-30",
});

const emailInput = input({
  label: "Email Address",
  required: false,
  type: "string",
  placeholder: "Enter email address",
  comments: "The employee's personal email address.",
  clean: toOptionalString,
  example: "john.doe@example.com",
});

const selfOnboardingInput = input({
  label: "Self Onboarding",
  required: false,
  type: "boolean",
  comments:
    "If true, employee is expected to self-onboard. If false, payroll admin is expected to enter in the employee's onboarding information.",
  clean: util.types.toBool,
  default: "false",
});

const ssnInput = input({
  label: "Social Security Number",
  required: false,
  type: "string",
  placeholder: "Enter social security number",
  comments: "The employee's social security number.",
  clean: toOptionalString,
  example: "123-45-6789",
});

export const listEmployeesInputs = {
  connection: connectionInput,
  companyId: companyIdInput,
  fetchAll,
  page: paginationPageInput,
};

export const getEmployeeInputs = {
  connection: connectionInput,
  employeeId: employeeIdInput,
};

export const createEmployeeInputs = {
  connection: connectionInput,
  companyId: companyIdInput,
  firstName: firstNameInput,
  middleInitial: middleInitialInput,
  lastName: lastNameInput,
  dateOfBirth: dateOfBirthInput,
  email: {
    ...emailInput,
    comments: `${emailInput.comments} Required if Self Onboarding is true.`,
  },
  ssn: ssnInput,
  selfOnboarding: selfOnboardingInput,
  additionalFields: additionalFieldsInput,
};

export const findEmployeeByEmailInputs = {
  connection: connectionInput,
  companyId: companyIdInput,
  email: { ...emailInput, required: true as const, clean: util.types.toString },
};
