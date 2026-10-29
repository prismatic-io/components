import { connection } from "../common";
import { email, identifier } from "./common";

export const updateEmployeeEmailInputs = {
  connection,
  identifier: {
    ...identifier,
    comments: "The employee's ID to update the email address for.",
    placeholder: "Enter employee ID",
  },
  email: {
    ...email,
    label: "New Email Address",
    comments: "The new email address for the employee.",
    placeholder: "Enter new email address",
  },
};
