import { input, util } from "@prismatic-io/spectral";
import { connection } from "../common";

export const deleteContactInputs = {
  connection,
  id: input({
    label: "Contact ID",
    comments: "The unique identifier of the contact to delete.",
    placeholder: "Enter contact ID",
    example: "12345678",
    type: "string",
    required: true,
    clean: util.types.toString,
    dataSource: "selectContact",
  }),
};
