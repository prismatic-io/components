import { input, util } from "@prismatic-io/spectral";
import { cleanBooleanInput, cleanCodeInput } from "../util";
import {
  CREATE_PROJECT_ADDITIONAL_FIELDS,
  TO_BE_CREATED_TEXT,
  TO_BE_UPDATED_TEXT,
} from "../constants";
import { connection, fieldsInput, recordNoInput } from "./common";
const projectIdInput = input({
  label: "Project ID",
  type: "string",
  comments:
    "Unique ID for the project. Required if company does not use document sequencing, or you can provide a value to use instead of the document sequence value.",
  required: false,
  example: "21-1234",
  placeholder: "Enter project ID",
  clean: util.types.toString,
  dataSource: "selectProject",
});
const projectNameInput = input({
  label: "Project Name",
  type: "string",
  comments: "The display name used to identify the project.",
  example: "Sample Project",
  placeholder: "Enter project name",
  required: true,
  clean: util.types.toString,
});
const projectCategoryInput = input({
  label: "Project Category",
  type: "string",
  comments:
    "The category classification for the project, such as Contract or Internal.",
  required: true,
  example: "Contract",
  placeholder: "Enter project category",
  clean: util.types.toString,
});
const projectDescriptionInput = input({
  label: "Project Description",
  type: "string",
  comments: "A detailed description of the project scope or purpose.",
  required: false,
  example: "This is a sample project",
  placeholder: "Enter project description",
  clean: util.types.toString,
});
const parentProjectIdInput = input({
  label: "Parent Project ID",
  type: "string",
  comments:
    "The ID of the parent project for hierarchical project relationships.",
  required: false,
  example: "21-1234",
  placeholder: "Enter project ID",
  clean: util.types.toString,
});
const invoiceWithParentInput = input({
  label: "Invoice with Parent",
  type: "boolean",
  comments: "Use false for No, true for Yes. (Default: false)",
  required: false,
  default: "false",
  clean: util.types.toBool,
});
const projectTypeInput = input({
  label: "Project Type",
  type: "string",
  comments: "The type classification for the project.",
  required: false,
  example: "Type 1",
  placeholder: "Enter project type",
  clean: util.types.toString,
});
const projectStatusInput = input({
  label: "Project Status",
  type: "string",
  comments:
    "The current status of the project, such as In Progress or Completed.",
  required: false,
  example: "In Progress",
  placeholder: "Enter project status",
  clean: util.types.toString,
});
const statusInput = input({
  label: "Status",
  type: "boolean",
  comments: "Use false for Inactive, true for Active. (Default: true)",
  default: "true",
  clean: util.types.toBool,
});
const additionalFields = input({
  label: "Additional Fields",
  type: "code",
  language: "json",
  comments: "Additional fields that are not covered by the standard inputs.",
  required: false,
  example: JSON.stringify({}, null, 2),
  clean: cleanCodeInput,
});
const modelBooleanUpdateInput = input({
  label: "",
  type: "string",
  comments: "Boolean update field for setting true, false, or empty values.",
  required: false,
  default: undefined,
  model: ["True", "False"].map((choice) => ({
    label: choice,
    value: choice.toLowerCase(),
  })),
  clean: cleanBooleanInput,
});
export const createProjectInputs = {
  connection,
  projectNameInput: {
    ...projectNameInput,
    comments: `${projectNameInput.comments} ${TO_BE_CREATED_TEXT}`,
  },
  projectCategoryInput: {
    ...projectCategoryInput,
    comments: `${projectCategoryInput.comments} ${TO_BE_CREATED_TEXT}`,
  },
  projectIdInput,
  projectDescriptionInput: {
    ...projectDescriptionInput,
    comments: `${projectDescriptionInput.comments} ${TO_BE_CREATED_TEXT}`,
  },
  parentProjectIdInput: {
    ...parentProjectIdInput,
    comments: `${parentProjectIdInput.comments} ${TO_BE_CREATED_TEXT}`,
  },
  invoiceWithParentInput,
  projectTypeInput: {
    ...projectTypeInput,
    comments: `${projectTypeInput.comments} ${TO_BE_CREATED_TEXT}`,
  },
  projectStatusInput: {
    ...projectStatusInput,
    comments: `${projectStatusInput.comments} ${TO_BE_CREATED_TEXT}`,
  },
  statusInput,
  additionalFields: {
    ...additionalFields,
    example: JSON.stringify(CREATE_PROJECT_ADDITIONAL_FIELDS, null, 2),
  },
};
export const getProjectInputs = {
  connection,
  fieldsInput,
  recordNoInput: {
    ...recordNoInput,
    comments: `${recordNoInput.comments} of the project to retrieve.`,
    dataSource: "selectProject",
  },
};
export const updateProjectInputs = {
  connection,
  projectIdInput: {
    ...projectIdInput,
    required: true,
    comments: "Project ID to update.",
    dataSource: "selectProject",
  },
  projectNameInput: {
    ...projectNameInput,
    required: false,
    comments: `${projectNameInput.comments} ${TO_BE_UPDATED_TEXT}`,
  },
  projectCategoryInput: {
    ...projectCategoryInput,
    required: false,
    comments: `${projectCategoryInput.comments} ${TO_BE_UPDATED_TEXT}`,
  },
  projectDescriptionInput: {
    ...projectDescriptionInput,
    comments: `${projectDescriptionInput.comments} ${TO_BE_UPDATED_TEXT}`,
  },
  parentProjectIdInput: {
    ...parentProjectIdInput,
    comments: `${parentProjectIdInput.comments} ${TO_BE_UPDATED_TEXT}`,
  },
  invoiceWithParentInput: {
    ...modelBooleanUpdateInput,
    label: invoiceWithParentInput.label,
  },
  projectTypeInput: {
    ...projectTypeInput,
    comments: `${projectTypeInput.comments} ${TO_BE_UPDATED_TEXT}`,
  },
  projectStatusInput: {
    ...projectStatusInput,
    comments: `${projectStatusInput.comments} ${TO_BE_UPDATED_TEXT}`,
  },
  statusInput: {
    ...modelBooleanUpdateInput,
    label: statusInput.label,
  },
  additionalFields: {
    ...additionalFields,
    example: JSON.stringify(CREATE_PROJECT_ADDITIONAL_FIELDS, null, 2),
  },
};
