import { connection } from "../common";
import { includeArchived, listName } from "./common";

export const getCompanyListInputs = {
  connection,
  listName: {
    ...listName,
    comments: "The name of the list to retrieve.",
  },
  includeArchived,
};
