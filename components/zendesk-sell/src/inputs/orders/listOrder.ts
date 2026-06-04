import { input, util } from "@prismatic-io/spectral";
import { connection, fetchAll } from "../common";

export const listOrderInputs = {
  connection,
  fetchAll,
  ids: input({
    label: "IDs",
    comments: "Comma-separated list of IDs to be returned in request.",
    example: "1,2,3",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  sortBy: input({
    label: "Sort By",
    comments:
      "A field to sort by. Default ordering is ascending. If you want to change the sort ordering to descending, append :desc to the field.",
    example: "value:desc",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  dealId: input({
    label: "Deal ID",
    placeholder: "Enter Deal ID",
    comments: "ID of the deal order is associated to.",
    example: "12",
    type: "string",
    required: false,
    clean: util.types.toString,
    dataSource: "selectDeal",
  }),
  page: input({
    label: "Page",
    comments:
      "Page number to start from. Page numbering starts at 1, and omitting the page parameter will return the first page.",
    example: "2",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  perPage: input({
    label: "Per Page",
    comments:
      "Number of records to return per page. Defaults to 25. Maximum is 500.",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),
};
