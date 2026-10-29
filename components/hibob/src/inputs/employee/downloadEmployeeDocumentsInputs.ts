import { connection, employeeId } from "../common";

export const downloadEmployeeDocumentsInputs = {
  connection,
  employeeId: {
    ...employeeId,
    comments: "The ID of the employee whose documents to download.",
  },
};
