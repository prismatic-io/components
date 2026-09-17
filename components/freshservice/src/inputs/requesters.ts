import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import {
  cleanArrayCodeInput,
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
const requestersDocumentationComments =
  "See [Freshservice API documentation](https://api.freshservice.com/#requester_attributes) for more information.";
const requestersAdditionalFields = input({
  ...additionalFields,
  comments: `${additionalFields.comments} ${requestersDocumentationComments}`,
});
const firstName = input({
  label: "First Name",
  type: "string",
  comments: "The given name of the requester.",
  required: true,
  example: "Ron",
  placeholder: "Enter first name",
  clean: util.types.toString,
});
const primaryEmail = input({
  label: "Primary Email",
  type: "string",
  comments: "The main email address used to contact the requester.",
  required: true,
  example: "ronald.weasley@hogwarts.edu",
  placeholder: "Enter primary email",
  clean: util.types.toString,
});
const lastName = input({
  label: "Last Name",
  type: "string",
  comments: "The family name of the requester.",
  example: "Weasley",
  placeholder: "Enter last name",
  required: false,
  clean: cleanStringInput,
});
const jobTitle = input({
  label: "Job Title",
  type: "string",
  comments: "The role or position held by the requester.",
  example: "Student",
  placeholder: "Enter job title",
  required: false,
  clean: cleanStringInput,
});
const workPhoneNumber = input({
  label: "Work Phone Number",
  type: "string",
  comments: "The office or desk phone number for the requester.",
  example: "77762443",
  placeholder: "Enter work phone number",
  required: false,
  clean: cleanStringInput,
});
const mobilePhoneNumber = input({
  label: "Mobile Phone Number",
  type: "string",
  comments: "The cell phone number for the requester.",
  example: "77762443",
  placeholder: "Enter mobile phone number",
  required: false,
  clean: cleanStringInput,
});
const reportingManagerId = input({
  label: "Reporting Manager ID",
  type: "string",
  comments: "The unique identifier for the supervisor of the requester.",
  example: "656",
  placeholder: "Enter reporting manager ID",
  required: false,
  clean: cleanNumberInput,
});
const secondaryEmails = input({
  label: "Secondary Emails",
  type: "code",
  language: "json",
  comments:
    "Additional/secondary emails associated with the requester. Array of email addresses.",
  example: JSON.stringify(
    ["ronald.weasley@freshservice.com", "ronald.weasley@freshworks.com"],
    null,
    2,
  ),
  clean: (value) => cleanArrayCodeInput(value, "Secondary Emails"),
});
const departmentIds = input({
  label: "Department IDs",
  type: "code",
  language: "json",
  comments:
    "Unique IDs of the departments associated with the requester. Array of ID numbers.",
  example: JSON.stringify([554], null, 2),
  clean: (value) => cleanArrayCodeInput(value, "Department IDs"),
});
const address = input({
  label: "Address",
  type: "string",
  comments: "The physical or mailing address of the requester.",
  example: "Gryffindor Tower",
  placeholder: "Enter address",
  required: false,
  clean: cleanStringInput,
});
const requesterId = input({
  label: "Requester ID",
  type: "string",
  comments: "The unique identifier for the requester.",
  example: "123",
  placeholder: "Enter requester ID",
  required: true,
  dataSource: "selectRequester",
  clean: util.types.toNumber,
});
const createRequesterContactInfo = structuredObjectInput({
  label: "Contact Information",
  required: false,
  comments: "Email, phone, and other contact channel details.",
  inputs: { secondaryEmails, workPhoneNumber, mobilePhoneNumber, address },
});
export const createRequesterInputs = {
  connection,
  firstName,
  lastName,
  primaryEmail,
  jobTitle,
  contactInfo: createRequesterContactInfo,
  reportingManagerId,
  departmentIds,
  requestersAdditionalFields,
};
export const deactivateRequesterInputs = {
  connection,
  requesterId: input({
    ...requesterId,
    comments: "Unique ID of the requester to deactivate.",
  }),
};
export const getRequesterInputs = {
  connection,
  requesterId,
};
export const listRequestersInputs = {
  connection,
  fetchAll,
  pagination,
  additionalQueryParams,
};
const updateRequesterContactInfo = structuredObjectInput({
  label: "Contact Information",
  required: false,
  comments: "Email, phone, and other contact channel details.",
  inputs: {
    primaryEmail: input({
      ...primaryEmail,
      required: false,
      clean: cleanStringInput,
    }),
    secondaryEmails,
    workPhoneNumber,
    mobilePhoneNumber,
    address,
  },
});
export const updateRequesterInputs = {
  connection,
  requesterId: input({
    ...requesterId,
    comments: "Unique ID of the requester to update.",
  }),
  jobTitle,
  firstName: input({
    ...firstName,
    required: false,
    clean: cleanStringInput,
  }),
  lastName,
  contactInfo: updateRequesterContactInfo,
  reportingManagerId,
  departmentIds,
  requestersAdditionalFields,
};
