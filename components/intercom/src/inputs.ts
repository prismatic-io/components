import { input, util } from "@prismatic-io/spectral";
import { cleanObject, cleanString } from "./util";

export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
});

export const idInput = input({
  label: "ID",
  type: "string",
  clean: cleanString,
  comments: "Unique identifier for the entity given by Intercom",
});

export const externalIdInput = input({
  label: "External ID",
  type: "string",
  clean: cleanString,
  comments: "Unique identifier for the entity from external systems",
});

export const startingAfterInput = input({
  label: "Starting After Cursor",
  type: "string",
  clean: cleanString,
  comments:
    "If you want to get the next page of data in the batch, you must make a new request with the starting_after parameter equal to the cursor pointer string. Use the starting_after parameter of the previous response.",
});

export const page = input({
  label: "Page",
  type: "string",
  comments: "The page of results to fetch.",
  required: false,
  example: "1",
  placeholder: "1",
  clean: cleanString,
});

export const perPage = input({
  label: "Per Page",
  type: "string",
  comments: "How many results to return per page. Default is 15. Max is 50.",
  required: false,
  example: "15",
  placeholder: "15",
  clean: cleanString,
});

export const order = input({
  label: "Order",
  type: "string",
  comments: "The order to sort the results in. Default is 'desc'.",
  required: false,
  model: [
    {
      value: "asc",
      label: "Ascending",
    },
    {
      value: "desc",
      label: "Descending",
    },
  ],
  default: "desc",
  clean: cleanString,
});

export const ticketAttributes = input({
  label: "Ticket Attributes",
  language: "json",
  type: "code",
  comments:
    "The attributes set on the ticket. When setting the default title and description attributes, the attribute keys that should be used are _default_title_ and _default_description_",
  required: false,
  example: JSON.stringify(
    {
      _default_title_: "example",
      _default_description_: "there is a problem",
    },
    null,
    2,
  ),
  clean: cleanObject,
});

export const ticketTypeId = input({
  label: "Ticket Type ID",
  type: "string",
  comments: "The ID of the type of ticket you want to create",
  example: "147",
  placeholder: "147",
  required: true,
  dataSource: "selectTicketType",
  clean: cleanString,
});

export const contactId = input({
  label: "Contact ID",
  type: "string",
  comments: "The ID / email / external Id of the user affected by this ticket.",
  example: "6657af026abd0167d9419def",
  placeholder: "6657af026abd0167d9419def",
  required: true,
  dataSource: "selectContact",
  clean: cleanString,
});

export const companyId = input({
  label: "Company ID",
  type: "string",
  comments:
    "The ID of the company that the ticket is associated with. The ID that you set upon company creation.",
  example: "147",
  placeholder: "147",
  required: false,
  dataSource: "selectCompany",
  clean: cleanString,
});

export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  comments: "If true, all pages of results will be fetched.",
  required: false,
  clean: util.types.toBool,
});

export const selectCompanyInputs = {
  connection: connectionInput,
};

export const selectContactInputs = {
  connection: connectionInput,
};

export const selectTagInputs = {
  connection: connectionInput,
};

export const selectTicketInputs = {
  connection: connectionInput,
};

export const selectTicketTypeInputs = {
  connection: connectionInput,
};
