import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { BOOLEAN_INPUT_MODEL } from "../constants";
import {
  cleanArrayCodeInput,
  cleanBooleanInput,
  cleanNumberInput,
  cleanStringInput,
} from "../util";
import {
  additionalFields,
  additionalQueryParams,
  connection,
  fetchAll,
  pagination,
} from "./common";
const agentsDocumentationComments =
  "See [Freshservice API documentation](https://api.freshservice.com/#agent_attributes) for more information.";
const agentsAdditionalFields = input({
  ...additionalFields,
  comments: `${additionalFields.comments} ${agentsDocumentationComments}`,
});
const levelOptions = [
  { label: "Beginner", value: "1" },
  { label: "Intermediate", value: "2" },
  { label: "Professional", value: "3" },
  { label: "Expert", value: "4" },
  { label: "Master", value: "5" },
  { label: "Guru", value: "6" },
];
const firstName = input({
  label: "First Name",
  comments: "The given name of the agent.",
  type: "string",
  required: true,
  placeholder: "Enter first name",
  example: "Rolanda",
  clean: util.types.toString,
});
const email = input({
  label: "Email",
  comments: "The primary email address used to identify the agent.",
  type: "string",
  required: true,
  placeholder: "Enter email address",
  example: "rolanda.hooch@hogwarts.edu",
  clean: util.types.toString,
});
const roles = input({
  label: "Roles",
  comments: `Roles of the agent. An array of hashes. ${agentsDocumentationComments}`,
  type: "code",
  language: "json",
  required: true,
  example: JSON.stringify(
    [
      { role_id: 7, assignment_scope: "specified_groups", groups: [4, 5] },
      { role_id: 9, assignment_scope: "assigned_items" },
      { role_id: 10, assignment_scope: "specified_groups", groups: [7] },
    ],
    null,
    2,
  ),
  clean: (value) => cleanArrayCodeInput(value, "Roles"),
});
const lastName = input({
  label: "Last Name",
  comments: "The family name of the agent.",
  type: "string",
  required: false,
  placeholder: "Enter last name",
  example: "Hooch",
  clean: cleanStringInput,
});
const address = input({
  label: "Address",
  comments: "The physical or mailing address of the agent.",
  type: "string",
  required: false,
  placeholder: "Enter address",
  example: "Gryffindor Tower",
  clean: cleanStringInput,
});
const occasional = input({
  label: "Occasional",
  comments:
    "When true, marks the agent as an occasional (part-time) agent rather than full-time.",
  type: "boolean",
  default: "false",
  clean: util.types.toBool,
});
const jobTitle = input({
  label: "Job Title",
  comments: "The role or position held by the agent.",
  type: "string",
  required: false,
  placeholder: "Enter job title",
  example: "Flying Instructor",
  clean: cleanStringInput,
});
const workPhoneNumber = input({
  label: "Work Phone Number",
  comments: "The office or desk phone number for the agent.",
  type: "string",
  required: false,
  placeholder: "Enter work phone number",
  example: "77762443",
  clean: cleanStringInput,
});
const mobilePhoneNumber = input({
  label: "Mobile Phone Number",
  comments: "The cell phone number for the agent.",
  type: "string",
  required: false,
  placeholder: "Enter mobile phone number",
  example: "77762443",
  clean: cleanStringInput,
});
const departmentIds = input({
  label: "Department IDs",
  comments: "Unique IDs of the departments associated with the agent.",
  type: "code",
  language: "json",
  required: false,
  example: JSON.stringify([554], null, 2),
  clean: (value) => cleanArrayCodeInput(value, "Department IDs"),
});
const canSeeAllTicketsFromAssociatedDepartments = input({
  label: "Can See All Tickets From Associated Departments",
  comments:
    "When true, allows the agent to view tickets filed by other members of associated departments.",
  type: "boolean",
  default: "false",
  clean: util.types.toBool,
});
const agentId = input({
  label: "Agent ID",
  comments: "The unique identifier for the agent.",
  type: "string",
  required: true,
  example: "4453",
  placeholder: "Enter agent ID",
  dataSource: "selectAgent",
  clean: util.types.toString,
});
const scoreboardLevelId = input({
  label: "Scoreboard Level ID",
  comments: "The Arcade gamification level assigned to the agent.",
  type: "string",
  required: false,
  example: "4",
  placeholder: "Select a scoreboard level",
  model: levelOptions,
  clean: cleanNumberInput,
});
const signature = input({
  label: "Signature",
  comments: "Signature of the agent in HTML format.",
  type: "code",
  language: "html",
  required: false,
  placeholder: "Enter signature HTML",
  example: "<p>Best regards,<br />Rolanda Hooch</p>",
  clean: cleanStringInput,
});
const contactInfo = structuredObjectInput({
  label: "Contact Information",
  required: false,
  comments: "Email, phone, and other contact channel details.",
  inputs: { workPhoneNumber, mobilePhoneNumber, address },
});
export const createAgentInputs = {
  connection,
  firstName,
  lastName,
  email,
  roles,
  contactInfo,
  occasional,
  jobTitle,
  departmentIds,
  canSeeAllTicketsFromAssociatedDepartments,
  agentsAdditionalFields,
};
export const deactivateAgentInputs = {
  connection,
  agentId: input({
    ...agentId,
    comments: "Unique ID of the agent to deactivate.",
  }),
};
export const forgetAgentInputs = {
  connection,
  agentId: input({
    ...agentId,
    comments: "Unique ID of the agent to forget.",
  }),
};
export const getAgentInputs = {
  connection,
  agentId,
};
export const listAgentsInputs = {
  connection,
  fetchAll,
  pagination,
  additionalQueryParams,
};
const updateAgentAdditionalFields = structuredObjectInput({
  label: "Additional Fields",
  required: false,
  comments:
    "Additional optional fields: includes Email, Address, Occasional, Signature, and Can See All Tickets From Associated Departments.",
  inputs: {
    email: input({
      ...email,
      required: false,
      clean: cleanStringInput,
    }),
    address,
    occasional: input({
      ...occasional,
      required: false,
      type: "string",
      default: undefined,
      model: BOOLEAN_INPUT_MODEL,
      clean: cleanBooleanInput,
    }),
    signature,
    canSeeAllTicketsFromAssociatedDepartments: input({
      ...canSeeAllTicketsFromAssociatedDepartments,
      required: false,
      type: "string",
      default: undefined,
      model: BOOLEAN_INPUT_MODEL,
      clean: cleanBooleanInput,
    }),
  },
});
export const updateAgentInputs = {
  connection,
  agentId: input({
    ...agentId,
    comments: "Unique ID of the agent to update.",
  }),
  roles: input({
    ...roles,
    required: false,
  }),
  scoreboardLevelId,
  departmentIds,
  additionalFields: updateAgentAdditionalFields,
  agentsAdditionalFields,
};
