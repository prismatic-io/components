import { input, structuredObjectInput } from "@prismatic-io/spectral";
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
const additionalFields = structuredObjectInput({
  label: "Additional Fields",
  required: false,
  comments:
    "Additional optional fields: includes Name, Description, Application Type, Status, Notes, Category, and Source.",
  inputs: {
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
    notes,
    category,
    source,
  },
});
export const updateSoftwareInputs = {
  connection,
  applicationId,
  managedById,
  additionalFields,
  softwareAdditionalFields,
};
