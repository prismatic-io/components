import { input } from "@prismatic-io/spectral";
import { connection } from "../common";
import { ticketId } from "./common";

export const deleteTicketInputs = {
  connection,
  ticketId: input({ ...ticketId, comments: "ID of the ticket to delete." }),
};
