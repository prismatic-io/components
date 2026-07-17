import { structuredObjectInput } from "@prismatic-io/spectral";
import { connection } from "../common";
import {
  address,
  departmentIds,
  firstName,
  jobTitle,
  lastName,
  mobilePhoneNumber,
  primaryEmail,
  reportingManagerId,
  requestersAdditionalFields,
  secondaryEmails,
  workPhoneNumber,
} from "./common";
const contactInfo = structuredObjectInput({
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
  contactInfo,
  reportingManagerId,
  departmentIds,
  requestersAdditionalFields,
};
