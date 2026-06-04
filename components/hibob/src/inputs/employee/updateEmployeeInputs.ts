import { connection } from "../common";
import { fieldsUpdate, identifier } from "./common";

export const updateEmployeeInputs = {
  connection,
  identifier: {
    ...identifier,
    comments: "The employee's ID to update.",
    placeholder: "Enter employee ID",
  },
  fields: fieldsUpdate,
};
