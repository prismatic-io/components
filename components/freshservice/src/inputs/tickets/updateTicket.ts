import { input } from "@prismatic-io/spectral";
import { cleanNumberInput } from "../../util";
import { connection } from "../common";
import {
  bypassMandatory,
  priority,
  source,
  status,
  ticketId,
  ticketsAdditionalFields,
} from "./common";

export const updateTicketInputs = {
  connection,
  ticketId: input({ ...ticketId, comments: "ID of the ticket to update." }),
  priority: input({ ...priority, required: false, clean: cleanNumberInput }),
  status: input({ ...status, required: false, clean: cleanNumberInput }),
  source: input({ ...source, required: false, clean: cleanNumberInput }),
  bypassMandatory,
  ticketsAdditionalFields,
};
