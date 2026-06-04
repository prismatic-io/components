import { connection, employeeId } from "../common";
import { taskStatus } from "./common";

export const getEmployeeTasksInputs = {
  connection,
  employeeId: {
    ...employeeId,
    comments:
      "The Employee ID as pulled from the database, or from the URL In Bob when viewing the employee.",
    example: "3332883884017713238",
  },
  taskStatus,
};
