import { connection, employeeId } from "../common";
import { customTableId, entryDataCreate } from "./common";

export const createCustomTableEntryInputs = {
  connection,
  employeeId: {
    ...employeeId,
    comments: "The ID of the employee to create the custom table entry for.",
  },
  customTableId,
  entryData: entryDataCreate,
};
