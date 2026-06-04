import { input, util } from "@prismatic-io/spectral";
import { cleanNumberInput, cleanStringInput } from "../../util";
import { additionalFields } from "../common";

const softwareDocumentationComments =
  "See [Freshservice API documentation](https://api.freshservice.com/#software_attributes) for more information.";

export const softwareAdditionalFields = input({
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

export const name = input({
  label: "Name",
  type: "string",
  required: true,
  comments: "The display name used to identify the software application.",
  example: "Freshservice",
  placeholder: "Enter software name",
  clean: util.types.toString,
});

export const description = input({
  label: "Description",
  type: "string",
  required: true,
  comments: "A summary of the software's purpose and capabilities.",
  example: "Cloud based ITSM software for service desk",
  placeholder: "Enter software description",
  clean: util.types.toString,
});

export const applicationType = input({
  label: "Application Type",
  type: "string",
  required: true,
  comments: "The deployment model of the software (Desktop, SaaS, or Mobile).",
  example: "saas",
  placeholder: "Enter application type",
  model: applicationTypeOptions,
  clean: util.types.toString,
});

export const status = input({
  label: "Status",
  type: "string",
  required: false,
  comments: "The current lifecycle stage of the software in the organization.",
  example: "managed",
  placeholder: "Enter status",
  model: statusOptions,
  clean: cleanStringInput,
});

export const managedById = input({
  label: "Managed By ID",
  type: "string",
  required: false,
  comments:
    "ID of the user managing the software (must be a user in Freshservice).",
  example: "79560",
  placeholder: "79560",
  clean: cleanNumberInput,
});

export const notes = input({
  label: "Notes",
  type: "string",
  required: false,
  comments: "Free-text remarks or additional context about the software.",
  example: "monthly renewal",
  placeholder: "Enter notes",
  clean: cleanStringInput,
});

export const category = input({
  label: "Category",
  type: "string",
  required: false,
  comments:
    "The classification group for the software (e.g., service desk application).",
  example: "service desk application",
  placeholder: "Enter category",
  clean: cleanStringInput,
});

export const source = input({
  label: "Source",
  type: "string",
  required: false,
  comments:
    "The origin system from where the software details were imported or updated.",
  example: "API",
  placeholder: "Enter source",
  clean: cleanStringInput,
});

export const workspaceId = input({
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

export const applicationId = input({
  label: "Application ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the software application.",
  example: "4",
  placeholder: "Enter application ID",
  dataSource: "selectSoftware",
  clean: util.types.toNumber,
});
