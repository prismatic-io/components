import { connection } from "../common";
import {
  applicationType,
  category,
  description,
  managedById,
  name,
  notes,
  softwareAdditionalFields,
  source,
  status,
  workspaceId,
} from "./common";

export const createSoftwareInputs = {
  connection,
  name,
  description,
  applicationType,
  status,
  managedById,
  notes,
  category,
  source,
  workspaceId,
  softwareAdditionalFields,
};
