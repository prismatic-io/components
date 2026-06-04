import { connection } from "../common";
import {
  ccEmails,
  description,
  email,
  priority,
  status,
  subject,
  ticketsAdditionalFields,
  workspaceId,
} from "./common";

export const createTicketInputs = {
  connection,
  description,
  subject,
  email,
  priority,
  status,
  ccEmails,
  workspaceId,
  ticketsAdditionalFields,
};
