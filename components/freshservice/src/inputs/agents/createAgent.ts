import { structuredObjectInput } from "@prismatic-io/spectral";
import { connection } from "../common";
import {
  address,
  agentsAdditionalFields,
  canSeeAllTicketsFromAssociatedDepartments,
  departmentIds,
  email,
  firstName,
  jobTitle,
  lastName,
  mobilePhoneNumber,
  occasional,
  roles,
  workPhoneNumber,
} from "./common";
const contactInfo = structuredObjectInput({
  label: "Contact Information",
  required: false,
  comments: "Email, phone, and other contact channel details.",
  inputs: { workPhoneNumber, mobilePhoneNumber, address },
});
export const createAgentInputs = {
  connection,
  firstName,
  email,
  roles,
  lastName,
  contactInfo,
  occasional,
  jobTitle,
  departmentIds,
  canSeeAllTicketsFromAssociatedDepartments,
  agentsAdditionalFields,
};
