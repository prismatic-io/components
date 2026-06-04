import { connection } from "../common";
import { fieldsSearch, filters, humanReadable, showInactive } from "./common";

export const searchEmployeeInputs = {
  connection,
  fields: fieldsSearch,
  filters,
  showInactive,
  humanReadable,
};
