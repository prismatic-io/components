import { input, util } from "@prismatic-io/spectral";
import { cleanNumberInput, cleanStringInput } from "../../util";
import { additionalFields } from "../common";

const onboardingDocumentationComments =
  "See [Freshservice API documentation](https://api.freshservice.com/#employee_onboarding) for more information.";

export const onboardingAdditionalFields = input({
  ...additionalFields,
  comments: `${additionalFields.comments} ${onboardingDocumentationComments}`,
});

export const cfEmployeeName = input({
  label: "Employee Name",
  comments: "The full name of the employee being onboarded.",
  type: "string",
  required: true,
  example: "Andrea",
  placeholder: "Enter employee name",
  clean: util.types.toString,
});

export const cfJobTitle = input({
  label: "Job Title",
  comments: "The role or position the employee will hold.",
  type: "string",
  required: true,
  example: "HR",
  placeholder: "Enter job title",
  clean: util.types.toString,
});

export const cfDateOfJoining = input({
  label: "Date of Joining",
  comments: "The start date for the employee. Format: YYYY-MM-DD.",
  type: "string",
  required: true,
  example: "2020-08-20",
  placeholder: "Enter date of joining",
  clean: util.types.toString,
});

export const cfAllUsers = input({
  label: "All Users",
  comments: "The email address of the employee being onboarded.",
  type: "string",
  required: true,
  example: "andrea@freshservice.com",
  placeholder: "Enter employee email",
  clean: util.types.toString,
});

export const cfDepartment = input({
  label: "Department",
  comments: "The organizational unit the employee belongs to.",
  type: "string",
  required: true,
  example: "HR",
  placeholder: "Enter department",
  clean: util.types.toString,
});

export const cfAssets = input({
  label: "Assets",
  comments: "The count of assets to provision for the employee.",
  type: "string",
  required: false,
  example: "1",
  placeholder: "Enter number of assets",
  clean: cleanNumberInput,
});

export const cfLocation = input({
  label: "Location",
  comments: "The office or site where the employee will be based.",
  type: "string",
  required: false,
  example: "5",
  placeholder: "Enter location",
  clean: cleanNumberInput,
});

export const cfHierarchy = input({
  label: "Hierarchy",
  comments: "The organizational level or band of the employee (e.g., L3).",
  type: "string",
  required: false,
  example: "L3",
  placeholder: "Enter hierarchy level",
  clean: cleanStringInput,
});

export const cfVerified = input({
  label: "Verified",
  comments:
    "When true, marks the employee as verified in the onboarding process.",
  type: "boolean",
  default: "false",
  clean: util.types.toBool,
});
