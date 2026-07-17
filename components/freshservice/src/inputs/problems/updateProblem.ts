import { input, structuredObjectInput } from "@prismatic-io/spectral";
import { cleanNumberInput, cleanStringInput } from "../../util";
import { connection } from "../common";
import {
  category,
  description,
  dueBy,
  email,
  impact,
  itemCategory,
  priority,
  problemId,
  problemsAdditionalFields,
  status,
  subCategory,
  subject,
} from "./common";
const categorization = structuredObjectInput({
  label: "Categorization",
  required: false,
  comments: "Category, sub-category, and item-category for the record.",
  inputs: { category, subCategory, itemCategory },
});
const additionalFields = structuredObjectInput({
  label: "Additional Fields",
  required: false,
  comments:
    "Additional optional fields: includes Subject, Email, Description, Due By, Priority, Status, and Impact.",
  inputs: {
    subject: input({ ...subject, required: false, clean: cleanStringInput }),
    email: input({ ...email, required: false, clean: cleanStringInput }),
    description: input({
      ...description,
      required: false,
      clean: cleanStringInput,
    }),
    dueBy: input({ ...dueBy, required: false, clean: cleanStringInput }),
    priority: input({ ...priority, required: false, clean: cleanNumberInput }),
    status: input({ ...status, required: false, clean: cleanNumberInput }),
    impact: input({ ...impact, required: false, clean: cleanNumberInput }),
  },
});
export const updateProblemInputs = {
  connection,
  problemId: input({ ...problemId, comments: "ID of the Problem to update." }),
  categorization,
  additionalFields,
  problemsAdditionalFields,
};
