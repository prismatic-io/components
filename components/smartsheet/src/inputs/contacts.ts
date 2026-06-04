import { input, util } from "@prismatic-io/spectral";
import { connectionInput, includeAll, page, pageSize } from "./common";

const contactId = input({
  label: "Contact ID",
  type: "string",
  required: true,
  clean: util.types.toString,
  comments: "The unique identifier for the contact.",
  placeholder: "Enter contact ID",
  dataSource: "selectContact",
});

export const getContactInputs = {
  connection: connectionInput,
  contactId,
};

export const listContactsInputs = {
  connection: connectionInput,
  includeAll,
  page,
  pageSize,
};
