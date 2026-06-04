import { input, util } from "@prismatic-io/spectral";
import { connection } from "../common";

export const deleteLeadInputs = {
  connection,
  id: input({
    label: "Lead ID",
    comments: "The unique identifier of the lead to delete.",
    placeholder: "Enter lead ID",
    example: "12345678",
    type: "string",
    required: true,
    clean: util.types.toString,
    dataSource: "selectLead",
  }),
};
