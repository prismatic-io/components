import { connection } from "../common";
import { identifier } from "./common";

export const revokeEmployeeAccessInputs = {
  connection,
  identifier: {
    ...identifier,
    comments: "The employee's ID or email address to revoke access for.",
  },
};
