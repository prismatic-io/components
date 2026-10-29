import { connection } from "../common";
import { fieldDescription, fieldId, fieldName } from "./common";

export const updateFieldInputs = {
  connection,
  fieldId: {
    ...fieldId,
    comments: "The ID of the field to update.",
  },
  name: {
    ...fieldName,
    required: false,
    comments: "The new name for the field.",
    example: "Updated Field Name",
    placeholder: "Enter new field name",
  },
  description: {
    ...fieldDescription,
    comments: "A new description for the field.",
    example: "Updated field description",
    placeholder: "Enter new field description",
  },
};
