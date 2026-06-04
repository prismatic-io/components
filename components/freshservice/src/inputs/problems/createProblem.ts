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

export const createProblemInputs = {
  connection,
  subject,
  email,
  description,
  dueBy,
  priority,
  status,
  impact,
  category,
  subCategory,
  itemCategory,
  problemsAdditionalFields,
};
