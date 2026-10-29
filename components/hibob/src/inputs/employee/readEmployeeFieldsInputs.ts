import { connection } from "../common";
import { fieldsRead, humanReadable, identifier } from "./common";

export const readEmployeeFieldsInputs = {
  connection,
  identifier: {
    ...identifier,
    comments: "The employee's ID or email address to retrieve data for.",
  },
  fields: fieldsRead,
  humanReadable,
};
