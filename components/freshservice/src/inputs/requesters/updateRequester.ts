import { input } from "@prismatic-io/spectral";
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

export const updateRequesterInputs = {
  connection,
  requesterId: input({
    ...requesterId,
    comments: "Unique ID of the requester to update.",
  }),
  firstName: input({ ...firstName, required: false, clean: cleanStringInput }),
  primaryEmail: input({
    ...primaryEmail,
    required: false,
    clean: cleanStringInput,
  }),
  lastName,
  jobTitle,
  workPhoneNumber,
  mobilePhoneNumber,
  reportingManagerId,
  secondaryEmails,
  departmentIds,
  address,
  requestersAdditionalFields,
};
