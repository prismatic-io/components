import { input } from "@prismatic-io/spectral";
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

export const updateProblemInputs = {
  connection,
  problemId: input({ ...problemId, comments: "ID of the Problem to update." }),
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
  category,
  subCategory,
  itemCategory,
  problemsAdditionalFields,
};
