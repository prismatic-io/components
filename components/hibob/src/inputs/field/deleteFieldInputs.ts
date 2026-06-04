import { connection } from "../common";
import { fieldId } from "./common";

export const deleteFieldInputs = {
  connection,
  fieldId: {
    ...fieldId,
    comments: "The ID of the field to delete.",
  },
};
