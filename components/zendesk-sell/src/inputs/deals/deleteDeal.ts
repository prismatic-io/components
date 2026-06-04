import { input, util } from "@prismatic-io/spectral";
import { connection } from "../common";

export const deleteDealInputs = {
  connection,
  id: input({
    label: "Deal ID",
    comments: "The unique identifier of the deal to delete.",
    placeholder: "Enter deal ID",
    example: "12345678",
    type: "string",
    required: true,
    clean: util.types.toString,
    dataSource: "selectDeal",
  }),
};
