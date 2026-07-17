import { input, structuredObjectInput } from "@prismatic-io/spectral";
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
const additionalFields = structuredObjectInput({
  label: "Additional Fields",
  required: false,
  comments:
    "Additional optional fields: includes Priority, Status, Source, and Bypass Mandatory.",
  inputs: {
    priority: input({ ...priority, required: false, clean: cleanNumberInput }),
    status: input({ ...status, required: false, clean: cleanNumberInput }),
    source: input({ ...source, required: false, clean: cleanNumberInput }),
    bypassMandatory,
  },
});
export const updateTicketInputs = {
  connection,
  ticketId: input({ ...ticketId, comments: "ID of the ticket to update." }),
  additionalFields,
  ticketsAdditionalFields,
};
