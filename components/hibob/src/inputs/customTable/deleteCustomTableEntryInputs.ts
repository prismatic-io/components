import { connection, employeeId } from "../common";
import { customTableId, entryId } from "./common";

export const deleteCustomTableEntryInputs = {
  connection,
  employeeId: {
    ...employeeId,
    comments:
      "The ID of the employee whose custom table entry will be deleted.",
  },
  customTableId: {
    ...customTableId,
    comments: "The ID of the custom table containing the entry to delete.",
  },
  entryId: {
    ...entryId,
    comments: "The ID of the custom table entry to delete.",
  },
};
