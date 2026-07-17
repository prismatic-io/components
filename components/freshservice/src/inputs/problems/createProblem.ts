import { structuredObjectInput } from "@prismatic-io/spectral";
import { connection } from "../common";
import {
  category,
  description,
  dueBy,
  email,
  impact,
  itemCategory,
  priority,
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
export const createProblemInputs = {
  connection,
  subject,
  email,
  description,
  dueBy,
  priority,
  status,
  impact,
  categorization,
  problemsAdditionalFields,
};
