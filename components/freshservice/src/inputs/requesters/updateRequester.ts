import { input, structuredObjectInput } from "@prismatic-io/spectral";
import { cleanStringInput } from "../../util";
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
  requesterId,
  requestersAdditionalFields,
  secondaryEmails,
  workPhoneNumber,
} from "./common";
const contactInfo = structuredObjectInput({
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
  contactInfo,
  reportingManagerId,
  departmentIds,
  requestersAdditionalFields,
};
