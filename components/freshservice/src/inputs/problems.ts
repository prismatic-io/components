import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { cleanNumberInput, cleanStringInput } from "../util";
import {
  additionalFields,
  additionalQueryParams,
  connection,
  fetchAll,
  pagination,
} from "./common";
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
const problemsAdditionalFields = input({
  ...additionalFields,
  comments: `${additionalFields.comments} ${problemsDocumentationComments}`,
});
const subject = input({
  label: "Subject",
  comments: "The brief summary line describing the problem.",
  type: "string",
  required: true,
  example: "Unable to reach email server",
  placeholder: "Enter problem subject",
  clean: util.types.toString,
});
const email = input({
  label: "Email",
  comments: "The email address of the person who reported the problem.",
  type: "string",
  required: true,
  example: "sample@freshservice.com",
  placeholder: "Enter email address",
  clean: util.types.toString,
});
const description = input({
  label: "Description",
  comments: "The HTML body content with details about the problem.",
  type: "code",
  language: "html",
  required: true,
  example: "<div>detailed description of the problem</div>",
  placeholder: "Enter problem description in HTML",
  clean: util.types.toString,
});
const dueBy = input({
  label: "Due By",
  comments:
    "The timestamp when the problem resolution is expected. Format: ISO 8601 (e.g., 2020-07-20T16:18:46Z).",
  type: "string",
  required: true,
  example: "2020-07-20T16:18:46Z",
  placeholder: "Enter due date",
  clean: util.types.toString,
});
const priority = input({
  label: "Priority",
  comments: "The urgency level that determines the problem's resolution order.",
  type: "string",
  model: priorityOptions,
  required: true,
  example: "2",
  placeholder: "Select a priority",
  clean: util.types.toNumber,
});
const status = input({
  label: "Status",
  comments: "The current lifecycle stage of the problem.",
  model: statusOptions,
  type: "string",
  required: true,
  example: "2",
  placeholder: "Select a status",
  clean: util.types.toNumber,
});
const impact = input({
  label: "Impact",
  comments: "The scope of business disruption caused by the problem.",
  type: "string",
  model: impactOptions,
  required: true,
  example: "1",
  placeholder: "Select an impact level",
  clean: util.types.toNumber,
});
const category = input({
  label: "Category",
  comments:
    "The classification group for the problem (e.g., Hardware, Software).",
  type: "string",
  required: false,
  example: "Hardware",
  placeholder: "Enter category",
  clean: cleanStringInput,
});
const subCategory = input({
  label: "Sub Category",
  comments: "The secondary classification within the problem's category.",
  type: "string",
  required: false,
  example: "Peripherals",
  placeholder: "Enter sub category",
  clean: cleanStringInput,
});
const itemCategory = input({
  label: "Item Category",
  comments: "The specific item type within the sub-category.",
  type: "string",
  required: false,
  example: "Router",
  placeholder: "Enter item category",
  clean: cleanStringInput,
});
const problemId = input({
  label: "Problem ID",
  comments: "The unique identifier for the problem.",
  type: "string",
  required: true,
  example: "1",
  placeholder: "Enter problem ID",
  dataSource: "selectProblem",
  clean: util.types.toNumber,
});
const workspaceId = input({
  label: "Workspace ID",
  comments: "The unique identifier for the target workspace.",
  type: "string",
  required: true,
  example: "1",
  placeholder: "Enter workspace ID",
  dataSource: "selectWorkspace",
  clean: util.types.toNumber,
});
const groupId = input({
  label: "Group ID",
  comments:
    "The unique identifier for the agent group to assign the problem to.",
  type: "string",
  required: false,
  example: "1",
  placeholder: "Enter group ID",
  clean: cleanNumberInput,
});
const ownerId = input({
  label: "Owner ID",
  comments:
    "The unique identifier for the agent to assign as the problem owner.",
  type: "string",
  required: false,
  example: "1",
  placeholder: "Enter owner ID",
  clean: cleanNumberInput,
});
const createProblemCategorization = structuredObjectInput({
  label: "Categorization",
  required: false,
  comments: "Category, sub-category, and item-category for the record.",
  inputs: { category, subCategory, itemCategory },
});
export const createProblemInputs = {
  connection,
  subject,
  email,
  description,
  dueBy,
  priority,
  status,
  impact,
  categorization: createProblemCategorization,
  problemsAdditionalFields,
};
export const deleteProblemInputs = {
  connection,
  problemId: input({ ...problemId, comments: "ID of the Problem to delete." }),
};
export const getProblemInputs = {
  connection,
  problemId,
};
export const listProblemsInputs = {
  connection,
  fetchAll,
  pagination,
  additionalQueryParams,
};
export const moveProblemInputs = {
  connection,
  problemId: input({ ...problemId, comments: "ID of the Problem to move." }),
  workspaceId,
  groupId,
  ownerId,
};
const updateProblemCategorization = structuredObjectInput({
  label: "Categorization",
  required: false,
  comments: "Category, sub-category, and item-category for the record.",
  inputs: { category, subCategory, itemCategory },
});
const updateProblemAdditionalFields = structuredObjectInput({
  label: "Additional Fields",
  required: false,
  comments:
    "Additional optional fields: includes Subject, Email, Description, Due By, Priority, Status, and Impact.",
  inputs: {
    subject: input({ ...subject, required: false, clean: cleanStringInput }),
    email: input({ ...email, required: false, clean: cleanStringInput }),
    description: input({
      ...description,
      required: false,
      clean: cleanStringInput,
    }),
    dueBy: input({ ...dueBy, required: false, clean: cleanStringInput }),
    priority: input({ ...priority, required: false, clean: cleanNumberInput }),
    status: input({ ...status, required: false, clean: cleanNumberInput }),
    impact: input({ ...impact, required: false, clean: cleanNumberInput }),
  },
});
export const updateProblemInputs = {
  connection,
  problemId: input({ ...problemId, comments: "ID of the Problem to update." }),
  categorization: updateProblemCategorization,
  additionalFields: updateProblemAdditionalFields,
  problemsAdditionalFields,
};
