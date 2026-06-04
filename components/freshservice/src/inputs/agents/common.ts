import { input, util } from "@prismatic-io/spectral";
import {
  cleanArrayCodeInput,
  cleanNumberInput,
  cleanStringInput,
} from "../../util";
import { additionalFields } from "../common";

const agentsDocumentationComments =
  "See [Freshservice API documentation](https://api.freshservice.com/#agent_attributes) for more information.";

export const agentsAdditionalFields = input({
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

export const firstName = input({
  label: "First Name",
  comments: "The given name of the agent.",
  type: "string",
  required: true,
  placeholder: "Enter first name",
  example: "Rolanda",
  clean: util.types.toString,
});

export const email = input({
  label: "Email",
  comments: "The primary email address used to identify the agent.",
  type: "string",
  required: true,
  placeholder: "Enter email address",
  example: "rolanda.hooch@hogwarts.edu",
  clean: util.types.toString,
});

export const roles = input({
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

export const lastName = input({
  label: "Last Name",
  comments: "The family name of the agent.",
  type: "string",
  required: false,
  placeholder: "Enter last name",
  example: "Hooch",
  clean: cleanStringInput,
});

export const address = input({
  label: "Address",
  comments: "The physical or mailing address of the agent.",
  type: "string",
  required: false,
  placeholder: "Enter address",
  example: "Gryffindor Tower",
  clean: cleanStringInput,
});

export const occasional = input({
  label: "Occasional",
  comments:
    "When true, marks the agent as an occasional (part-time) agent rather than full-time.",
  type: "boolean",
  default: "false",
  clean: util.types.toBool,
});

export const jobTitle = input({
  label: "Job Title",
  comments: "The role or position held by the agent.",
  type: "string",
  required: false,
  placeholder: "Enter job title",
  example: "Flying Instructor",
  clean: cleanStringInput,
});

export const workPhoneNumber = input({
  label: "Work Phone Number",
  comments: "The office or desk phone number for the agent.",
  type: "string",
  required: false,
  placeholder: "Enter work phone number",
  example: "77762443",
  clean: cleanStringInput,
});

export const mobilePhoneNumber = input({
  label: "Mobile Phone Number",
  comments: "The cell phone number for the agent.",
  type: "string",
  required: false,
  placeholder: "Enter mobile phone number",
  example: "77762443",
  clean: cleanStringInput,
});

export const departmentIds = input({
  label: "Department IDs",
  comments: "Unique IDs of the departments associated with the agent.",
  type: "code",
  language: "json",
  required: false,
  example: JSON.stringify([554], null, 2),
  clean: (value) => cleanArrayCodeInput(value, "Department IDs"),
});

export const canSeeAllTicketsFromAssociatedDepartments = input({
  label: "Can See All Tickets From Associated Departments",
  comments:
    "When true, allows the agent to view tickets filed by other members of associated departments.",
  type: "boolean",
  default: "false",
  clean: util.types.toBool,
});

export const agentId = input({
  label: "Agent ID",
  comments: "The unique identifier for the agent.",
  type: "string",
  required: true,
  example: "4453",
  placeholder: "Enter agent ID",
  dataSource: "selectAgent",
  clean: util.types.toString,
});

export const scoreboardLevelId = input({
  label: "Scoreboard Level ID",
  comments: "The Arcade gamification level assigned to the agent.",
  type: "string",
  required: false,
  example: "4",
  placeholder: "Enter scoreboard level",
  model: levelOptions,
  clean: cleanNumberInput,
});

export const signature = input({
  label: "Signature",
  comments: "Signature of the agent in HTML format.",
  type: "code",
  language: "html",
  required: false,
  placeholder: "<p>Best regards,<br />Rolanda Hooch</p>",
  example: "<p>Best regards,<br />Rolanda Hooch</p>",
  clean: cleanStringInput,
});
