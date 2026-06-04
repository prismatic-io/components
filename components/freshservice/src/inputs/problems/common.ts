import { input, util } from "@prismatic-io/spectral";
import { cleanNumberInput, cleanStringInput } from "../../util";
import { additionalFields } from "../common";

const statusOptions = [
  { label: "Open", value: "1" },
  { label: "Change Requested", value: "2" },
  { label: "Closed", value: "3" },
];

const priorityOptions = [
  { label: "Low", value: "1" },
  { label: "Medium", value: "2" },
  { label: "High", value: "3" },
  { label: "Urgent", value: "4" },
];

const impactOptions = [
  { label: "Low", value: "1" },
  { label: "Medium", value: "2" },
  { label: "High", value: "3" },
];

const problemsDocumentationComments =
  "See [Freshservice API documentation](https://api.freshservice.com/#problem_attributes) for more information.";

export const problemsAdditionalFields = input({
  ...additionalFields,
  comments: `${additionalFields.comments} ${problemsDocumentationComments}`,
});

export const subject = input({
  label: "Subject",
  comments: "The brief summary line describing the problem.",
  type: "string",
  required: true,
  example: "Unable to reach email server",
  placeholder: "Enter problem subject",
  clean: util.types.toString,
});

export const email = input({
  label: "Email",
  comments: "The email address of the person who reported the problem.",
  type: "string",
  required: true,
  example: "sample@freshservice.com",
  placeholder: "Enter email address",
  clean: util.types.toString,
});

export const description = input({
  label: "Description",
  comments: "The HTML body content with details about the problem.",
  type: "code",
  language: "html",
  required: true,
  example: "<div>detailed description of the problem</div>",
  placeholder: "Enter problem description in HTML",
  clean: util.types.toString,
});

export const dueBy = input({
  label: "Due By",
  comments:
    "The timestamp when the problem resolution is expected. Format: ISO 8601 (e.g., 2020-07-20T16:18:46Z).",
  type: "string",
  required: true,
  example: "2020-07-20T16:18:46Z",
  placeholder: "Enter due date",
  clean: util.types.toString,
});

export const priority = input({
  label: "Priority",
  comments: "The urgency level that determines the problem's resolution order.",
  type: "string",
  model: priorityOptions,
  required: true,
  example: "2",
  placeholder: "Enter priority level",
  clean: util.types.toNumber,
});

export const status = input({
  label: "Status",
  comments: "The current lifecycle stage of the problem.",
  model: statusOptions,
  type: "string",
  required: true,
  example: "2",
  placeholder: "Enter status",
  clean: util.types.toNumber,
});

export const impact = input({
  label: "Impact",
  comments: "The scope of business disruption caused by the problem.",
  type: "string",
  model: impactOptions,
  required: true,
  example: "1",
  placeholder: "Enter impact level",
  clean: util.types.toNumber,
});

export const category = input({
  label: "Category",
  comments:
    "The classification group for the problem (e.g., Hardware, Software).",
  type: "string",
  required: false,
  example: "Hardware",
  placeholder: "Enter category",
  clean: cleanStringInput,
});

export const subCategory = input({
  label: "Sub Category",
  comments: "The secondary classification within the problem's category.",
  type: "string",
  required: false,
  example: "Peripherals",
  placeholder: "Enter sub category",
  clean: cleanStringInput,
});

export const itemCategory = input({
  label: "Item Category",
  comments: "The specific item type within the sub-category.",
  type: "string",
  required: false,
  example: "Router",
  placeholder: "Enter item category",
  clean: cleanStringInput,
});

export const problemId = input({
  label: "Problem ID",
  comments: "The unique identifier for the problem.",
  type: "string",
  required: true,
  example: "1",
  placeholder: "Enter problem ID",
  dataSource: "selectProblem",
  clean: util.types.toNumber,
});

export const workspaceId = input({
  label: "Workspace ID",
  comments: "The unique identifier for the target workspace.",
  type: "string",
  required: true,
  example: "1",
  placeholder: "Enter workspace ID",
  dataSource: "selectWorkspace",
  clean: util.types.toNumber,
});

export const groupId = input({
  label: "Group ID",
  comments:
    "The unique identifier for the agent group to assign the problem to.",
  type: "string",
  required: false,
  example: "1",
  placeholder: "Enter group ID",
  clean: cleanNumberInput,
});

export const ownerId = input({
  label: "Owner ID",
  comments:
    "The unique identifier for the agent to assign as the problem owner.",
  type: "string",
  required: false,
  example: "1",
  placeholder: "Enter owner ID",
  clean: cleanNumberInput,
});
