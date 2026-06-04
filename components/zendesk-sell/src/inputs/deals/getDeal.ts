import { input, util } from "@prismatic-io/spectral";
import { connection } from "../common";

export const getDealInputs = {
  connection,
  id: input({
    label: "Deal ID",
    comments: "The unique identifier of the deal to retrieve.",
    placeholder: "Enter deal ID",
    example: "12345678",
    type: "string",
    required: true,
    clean: util.types.toString,
    dataSource: "selectDeal",
  }),
  includes: input({
    label: "Includes",
    comments:
      "Comma-separated list of one or more resources related to the deal. Possible values: associated_contacts.",
    placeholder: "Enter related resources",
    example: "associated_contacts",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),
};
