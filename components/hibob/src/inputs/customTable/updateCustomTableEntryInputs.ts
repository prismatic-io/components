import { connection, employeeId } from "../common";
import { customTableId, entryDataUpdate, entryId } from "./common";

export const updateCustomTableEntryInputs = {
  connection,
  employeeId: {
    ...employeeId,
    comments:
      "The ID of the employee whose custom table entry will be updated.",
  },
  customTableId: {
    ...customTableId,
    comments: "The ID of the custom table containing the entry to update.",
  },
  entryId: {
    ...entryId,
    comments: "The ID of the custom table entry to update.",
  },
  entryData: entryDataUpdate,
};
