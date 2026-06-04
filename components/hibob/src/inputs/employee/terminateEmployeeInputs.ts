import { connection } from "../common";
import {
  identifier,
  lastDayOfWork,
  noticePeriod,
  reason,
  terminationDate,
  terminationReason,
} from "./common";

export const terminateEmployeeInputs = {
  connection,
  identifier: {
    ...identifier,
    comments:
      "The backend-id of the Employee to terminate. Retrieve this ID from the database.",
  },
  terminationDate,
  terminationReason,
  reason,
  noticePeriod,
  lastDayOfWork,
};
