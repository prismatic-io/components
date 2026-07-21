import { input, util } from "@prismatic-io/spectral";
import { toOptionalString } from "../util";
import {
  connectionInput,
  pagination,
  projectId,
  searchString,
  timeout,
} from "./common";
const parentProjectId = input({
  label: "Parent Project ID",
  type: "string",
  required: false,
  comments: "The unique identifier for the parent project.",
  example: "f12a9855-1059-4cd7-9e6a-a4ba5089e374",
  placeholder: "Enter parent project ID",
  clean: toOptionalString,
});
const projectName = input({
  label: "Project Name",
  type: "string",
  required: true,
  comments: "The display name shown for the project in Tableau.",
  example: "MyProject",
  placeholder: "Enter project name",
  clean: util.types.toString,
});
const description = input({
  label: "Description",
  type: "string",
  required: false,
  comments: "A description of the project.",
  example: "This is an example description",
  placeholder: "Enter description",
  clean: toOptionalString,
});
const contentPermissions = input({
  label: "Content Permissions",
  type: "string",
  required: false,
  comments:
    "Controls user permissions in a project. A nested project inherits the parent's permissions and this setting has no effect.",
  example: "ManagedByOwner",
  clean: toOptionalString,
  model: [
    { label: "Managed By Owner", value: "ManagedByOwner" },
    { label: "Locked To Project", value: "LockedToProject" },
    {
      label: "Locked To Project Without Nested",
      value: "LockedToWProjectWithoutNested",
    },
  ],
});
const projectSearchField = input({
  label: "Search Field",
  type: "string",
  required: true,
  comments:
    "The field to search. Dates should follow the ISO format: 2016-05-04T21:24:49Z",
  example: "Name",
  clean: util.types.toString,
  model: [
    { label: "Name", value: "name" },
    { label: "Created At", value: "createdAt" },
    { label: "Owner Domain", value: "ownerDomain" },
    { label: "Owner Name", value: "ownerName" },
    { label: "Owner Email", value: "ownerEmail" },
    { label: "Parent Project ID", value: "parentProjectId" },
  ],
});
export const listProjectsInputs = {
  timeout,
  pagination,
  tableauConnection: connectionInput,
};
export const searchProjectsInputs = {
  searchString,
  searchField: projectSearchField,
  timeout,
  tableauConnection: connectionInput,
  pagination,
};
export const getProjectInputs = {
  projectName,
  timeout,
  tableauConnection: connectionInput,
};
export const deleteProjectsInputs = {
  projectId,
  timeout,
  tableauConnection: connectionInput,
};
export const createProjectInputs = {
  parentProjectId,
  projectName,
  contentPermissions,
  description,
  timeout,
  tableauConnection: connectionInput,
};
export const updateProjectInputs = {
  projectId,
  parentProjectId,
  projectName: { ...projectName, required: false },
  contentPermissions,
  description,
  timeout,
  tableauConnection: connectionInput,
};
