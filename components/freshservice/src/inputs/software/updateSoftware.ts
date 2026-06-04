import { input } from "@prismatic-io/spectral";
import { cleanStringInput } from "../../util";
import { connection } from "../common";
import {
  applicationId,
  applicationType,
  category,
  description,
  managedById,
  name,
  notes,
  softwareAdditionalFields,
  source,
  status,
} from "./common";

export const updateSoftwareInputs = {
  connection,
  applicationId,
  name: input({
    ...name,
    required: false,
    clean: cleanStringInput,
  }),
  description: input({
    ...description,
    required: false,
    clean: cleanStringInput,
  }),
  applicationType: input({
    ...applicationType,
    required: false,
    clean: cleanStringInput,
  }),
  status,
  managedById,
  notes,
  category,
  source,
  softwareAdditionalFields,
};
