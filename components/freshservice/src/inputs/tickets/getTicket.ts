import { input } from "@prismatic-io/spectral";
import { additionalQueryParams, connection } from "../common";
import { ticketId } from "./common";

export const getTicketInputs = {
  connection,
  ticketId: input({ ...ticketId, comments: "ID of the ticket to retrieve." }),
  additionalQueryParams,
};
