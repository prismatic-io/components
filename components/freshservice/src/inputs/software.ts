import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { cleanNumberInput, cleanStringInput } from "../util";
import { additionalFields, connection } from "./common";
const softwareDocumentationComments =
  "See [Freshservice API documentation](https://api.freshservice.com/#software_attributes) for more information.";
const softwareAdditionalFields = input({
  ...additionalFields,
  comments: `${additionalFields.comments} ${softwareDocumentationComments}`,
});
const applicationTypeOptions = [
  { label: "Desktop", value: "desktop" },
  { label: "SaaS", value: "saas" },
  { label: "Mobile", value: "mobile" },
];
const statusOptions = [
  { label: "Restricted", value: "restricted" },
  { label: "Ignored", value: "ignored" },
  { label: "Managed", value: "managed" },
  { label: "Discovered", value: "discovered" },
  { label: "Disabled", value: "disabled" },
  { label: "In Review", value: "in review" },
  { label: "Needs Review", value: "needs review" },
];
const name = input({
  label: "Name",
  type: "string",
  required: true,
  comments: "The display name used to identify the software application.",
  example: "Freshservice",
  placeholder: "Enter software name",
  clean: util.types.toString,
});
const description = input({
  label: "Description",
  type: "string",
  required: true,
  comments: "A summary of the software's purpose and capabilities.",
  example: "Cloud based ITSM software for service desk",
  placeholder: "Enter software description",
  clean: util.types.toString,
});
const applicationType = input({
  label: "Application Type",
  type: "string",
  required: true,
  comments: "The deployment model of the software (Desktop, SaaS, or Mobile).",
  example: "saas",
  placeholder: "Select an application type",
  model: applicationTypeOptions,
  clean: util.types.toString,
});
const status = input({
  label: "Status",
  type: "string",
  required: false,
  comments: "The current lifecycle stage of the software in the organization.",
  example: "managed",
  placeholder: "Select a status",
  model: statusOptions,
  clean: cleanStringInput,
});
const managedById = input({
  label: "Managed By ID",
  type: "string",
  required: false,
  comments:
    "ID of the user managing the software (must be a user in Freshservice).",
  example: "79560",
  placeholder: "Enter user ID",
  clean: cleanNumberInput,
});
const notes = input({
  label: "Notes",
  type: "string",
  required: false,
  comments: "Free-text remarks or additional context about the software.",
  example: "monthly renewal",
  placeholder: "Enter notes",
  clean: cleanStringInput,
});
const category = input({
  label: "Category",
  type: "string",
  required: false,
  comments:
    "The classification group for the software (e.g., service desk application).",
  example: "service desk application",
  placeholder: "Enter category",
  clean: cleanStringInput,
});
const source = input({
  label: "Source",
  type: "string",
  required: false,
  comments:
    "The origin system from where the software details were imported or updated.",
  example: "API",
  placeholder: "Enter source",
  clean: cleanStringInput,
});
const workspaceId = input({
  label: "Workspace ID",
  type: "string",
  required: false,
  comments:
    "The unique identifier for the workspace the software belongs to. Defaults to the primary workspace if not provided. Applicable only to accounts on Employee Support Mode.",
  example: "2",
  placeholder: "Enter workspace ID",
  dataSource: "selectWorkspace",
  clean: cleanNumberInput,
});
const applicationId = input({
  label: "Application ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the software application.",
  example: "4",
  placeholder: "Enter application ID",
  dataSource: "selectSoftware",
  clean: util.types.toNumber,
});
const createSoftwareAdditionalFields = structuredObjectInput({
  label: "Additional Fields",
  comments:
    "Additional optional fields: includes Status, Notes, Category, and Source.",
  inputs: {
    status,
    notes,
    category,
    source,
  },
});
export const createSoftwareInputs = {
  connection,
  name,
  description,
  applicationType,
  managedById,
  additionalFields: createSoftwareAdditionalFields,
  workspaceId,
  softwareAdditionalFields,
};
export const deleteSoftwareInputs = {
  connection,
  applicationId: input({
    ...applicationId,
    comments: "Unique ID of the software to delete.",
  }),
};
export const getSoftwareInputs = {
  connection,
  applicationId: input({
    ...applicationId,
    comments: "Unique ID of the software to retrieve.",
  }),
};
export const listSoftwareInputs = {
  connection,
};
export const moveSoftwareInputs = {
  connection,
  applicationId: input({
    ...applicationId,
    comments: "Unique ID of the software to move.",
  }),
  workspaceId: input({
    ...workspaceId,
    required: true,
    comments: "ID of the workspace to move the software to.",
    clean: util.types.toNumber,
  }),
};
const updateSoftwareAdditionalFields = structuredObjectInput({
  label: "Additional Fields",
  required: false,
  comments:
    "Additional optional fields: includes Name, Description, Application Type, Status, Notes, Category, and Source.",
  inputs: {
    name: input({
      ...name,
      required: false,
      clean: cleanStringInput,
    }),
    description: input({
      ...description,
      required: false,
      clean: cleanStringInput,
    }),
    applicationType: input({
      ...applicationType,
      required: false,
      clean: cleanStringInput,
    }),
    status,
    notes,
    category,
    source,
  },
});
export const updateSoftwareInputs = {
  connection,
  applicationId,
  managedById,
  additionalFields: updateSoftwareAdditionalFields,
  softwareAdditionalFields,
};
