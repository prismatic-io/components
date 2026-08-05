import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { COLOR_INPUT_OPTIONS, PROJECT_OPT_FIELDS } from "../constants";
import { cleanString, validateId } from "../util";
import {
  connectionInput,
  dueOn,
  fieldId,
  followers,
  htmlNotes,
  insertAfter,
  insertBefore,
  isImportant,
  members,
  name,
  notes,
  optFields,
  pagination,
  projectId,
  startOn,
  teamId,
  workspaceId,
} from "./common";
const projectColor = input({
  label: "Project Color",
  type: "string",
  model: COLOR_INPUT_OPTIONS,
  default: "light-green",
  comments: "The display color associated with the project in the Asana UI.",
  required: false,
  clean: cleanString,
});
const archived = input({
  label: "Archived",
  type: "boolean",
  comments:
    "When true, the project is archived and hidden from the UI by default. Archived projects may be treated differently for queries.",
  required: false,
  clean: util.types.toBool,
});
const defaultView = input({
  label: "Default View",
  type: "string",
  comments: "The default view to display when opening the project in Asana.",
  model: [
    { label: "List", value: "list" },
    { label: "Board", value: "board" },
    { label: "Calendar", value: "calendar" },
    { label: "Timeline", value: "timeline" },
  ],
  default: "list",
  required: true,
  clean: util.types.toString,
});
const privacySetting = input({
  label: "Privacy Setting",
  type: "string",
  comments:
    "The privacy setting of the project. Administrators in the organization may restrict these values.",
  required: false,
  model: [
    {
      label: "Public To Workspace",
      value: "public_to_workspace",
    },
    {
      label: "Private To Team",
      value: "private_to_team",
    },
    {
      label: "Private",
      value: "private",
    },
  ],
  clean: util.types.toString,
});
const owner = input({
  label: "Owner ID",
  type: "string",
  comments:
    "The unique identifier of the user who will own the project. The owner has full administrative rights over the project.",
  example: "375893453",
  placeholder: "Enter owner user ID",
  required: true,
  clean: validateId,
});
const team = input({
  label: "Team ID",
  type: "string",
  comments:
    "The team that this project is shared with. Only exists for projects in organizations — including this field for non-organization projects causes the request to fail.",
  example: "375893453",
  placeholder: "Enter team ID",
  required: false,
  clean: validateId,
});
const createProjectSettings = structuredObjectInput({
  label: "Project Settings",
  required: false,
  comments: "Archived, Privacy Setting, and Project Color.",
  inputs: { archived, privacySetting, projectColor },
});
const updateProjectSettings = structuredObjectInput({
  label: "Project Settings",
  required: false,
  comments: "Archived, Default View, Privacy Setting, and Project Color.",
  inputs: {
    archived,
    defaultView: { ...defaultView, required: false, default: "" },
    privacySetting,
    projectColor,
  },
});
export const createProjectsInputs = {
  asanaConnection: connectionInput,
  defaultView,
  dueOn,
  followers,
  htmlNotes,
  name,
  notes,
  optFields: { ...optFields, default: PROJECT_OPT_FIELDS },
  owner,
  projectSettings: createProjectSettings,
  startOn,
  team: { ...team, required: true },
  workspaceId: {
    ...workspaceId,
    required: false,
    comments:
      "Include this value if you would like this project to be included in a workspace.",
  },
};
export const updateProjectInputs = {
  asanaConnection: connectionInput,
  dueOn,
  followers,
  htmlNotes,
  name,
  notes,
  owner: { ...owner, required: false },
  projectId,
  projectSettings: updateProjectSettings,
  startOn,
  team,
};
export const listProjectsInputs = {
  asanaConnection: connectionInput,
  optFields: { ...optFields, default: PROJECT_OPT_FIELDS },
  pagination,
  workspaceId: { ...workspaceId, required: false },
};
export const getProjectInputs = {
  asanaConnection: connectionInput,
  optFields: { ...optFields, default: PROJECT_OPT_FIELDS },
  projectId,
};
export const deleteProjectsInputs = {
  asanaConnection: connectionInput,
  projectId,
};
export const addUserToProjectInputs = {
  asanaConnection: connectionInput,
  members,
  optFields: {
    ...optFields,
    default:
      "team,workspace,html_notes,notes,color,custom_field_settings,custom_fields,followers,members,privacy_setting,archived,modified_at,created_at,start_on,due_on,current_status,owner,name",
  },
  projectId,
};
export const addCustomFieldToProjectInputs = {
  asanaConnection: connectionInput,
  fieldId,
  insertAfter,
  insertBefore,
  isImportant,
  projectId,
};
export const removeCustomFieldFromProjectInputs = {
  asanaConnection: connectionInput,
  fieldId,
  projectId,
};
export const selectProjectInputs = {
  connection: connectionInput,
  workspace: {
    ...workspaceId,
    required: false,
    clean: cleanString,
    dataSource: undefined,
  },
  team: {
    ...teamId,
    required: false,
    clean: cleanString,
    dataSource: undefined,
  },
};
