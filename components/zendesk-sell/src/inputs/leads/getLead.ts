import { input, util } from "@prismatic-io/spectral";
import { connection } from "../common";

export const getLeadInputs = {
  connection,
  id: input({
    label: "Lead ID",
    comments: "The unique identifier of the lead to retrieve.",
    placeholder: "Enter lead ID",
    example: "12345678",
    type: "string",
    required: true,
    clean: util.types.toString,
    dataSource: "selectLead",
  }),
};
