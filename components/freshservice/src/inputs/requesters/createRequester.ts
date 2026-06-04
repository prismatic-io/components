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

export const createRequesterInputs = {
  connection,
  firstName,
  primaryEmail,
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
