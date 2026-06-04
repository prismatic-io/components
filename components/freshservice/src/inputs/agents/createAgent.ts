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

export const createAgentInputs = {
  connection,
  firstName,
  email,
  roles,
  lastName,
  address,
  occasional,
  jobTitle,
  workPhoneNumber,
  mobilePhoneNumber,
  departmentIds,
  canSeeAllTicketsFromAssociatedDepartments,
  agentsAdditionalFields,
};
