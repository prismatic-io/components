import { input, util } from "@prismatic-io/spectral";
import { connection } from "../common";

export const getContactInputs = {
  connection,
  id: input({
    label: "Contact ID",
    type: "string",
    comments: "The unique identifier of the contact to retrieve.",
    placeholder: "Enter contact ID",
    example: "12345678",
    required: true,
    clean: util.types.toString,
    dataSource: "selectContact",
  }),
};
