import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { connection, fetchAll } from "./common";

const createDealId = input({
  label: "Deal ID",
  placeholder: "Enter Deal ID",
  example: "12345678",
  comments: "The unique identifier of the deal.",
  type: "string",
  required: true,
  clean: util.types.toString,
  dataSource: "selectDeal",
});

const discountOptional = input({
  label: "Discount",
  comments: "Overall discount on the order in percents. Defaults to 0.",
  placeholder: "Enter discount percentage",
  example: "50",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const orderId = input({
  label: "Order ID",
  placeholder: "Enter order ID",
  example: "12345678",
  comments: "The unique identifier of the order.",
  type: "string",
  required: true,
  clean: util.types.toString,
  dataSource: "selectOrder",
});

const position = input({
  label: "Position",
  comments:
    "The client position in the Firehose stream. Possible values: top, tail, or a position string from a previous API response.",
  placeholder: "Enter stream position",
  example: "top",
  type: "string",
  required: true,
  clean: util.types.toString,
});

const limit = input({
  label: "Limit",
  comments: "The maximum number of events to return in a single response.",
  placeholder: "Enter limit",
  example: "100",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const ids = input({
  label: "IDs",
  comments: "Comma-separated list of IDs to be returned in request.",
  placeholder: "Enter comma-separated IDs",
  example: "1,2,3",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const sortBy = input({
  label: "Sort By",
  comments:
    "A field to sort by. Default ordering is ascending. To change the sort ordering to descending, append :desc to the field.",
  placeholder: "Enter field to sort by",
  example: "value:desc",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const dealId = input({
  label: "Deal ID",
  placeholder: "Enter Deal ID",
  comments: "The unique identifier of the deal the order is associated with.",
  example: "12",
  type: "string",
  required: false,
  clean: util.types.toString,
  dataSource: "selectDeal",
});

const page = input({
  label: "Page",
  comments:
    "Page number to start from. Page numbering starts at 1, and omitting the page parameter will return the first page.",
  placeholder: "Enter page number",
  example: "2",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const perPage = input({
  label: "Per Page",
  comments:
    "Number of records to return per page. Defaults to 25. Maximum is 500.",
  placeholder: "Enter results per page",
  example: "25",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const pagination = structuredObjectInput({
  label: "Pagination",
  required: false,
  comments: "Page and page-size controls.",
  inputs: { page, perPage },
});

const discountRequired = input({
  label: "Discount",
  comments: "Overall discount on the order in percents.",
  placeholder: "Enter discount percentage",
  example: "25",
  type: "string",
  required: true,
  clean: util.types.toString,
});

export const createOrderInputs = {
  connection,
  dealId: createDealId,
  discount: discountOptional,
};

export const deleteOrderInputs = {
  connection,
  id: orderId,
};

export const getOrderInputs = {
  connection,
  id: orderId,
};

export const getOrdersStreamInputs = {
  connection,
  position,
  limit,
};

export const listOrderInputs = {
  connection,
  fetchAll,
  ids,
  dealId,
  sortBy,
  pagination,
};

export const updateOrderInputs = {
  connection,
  id: orderId,
  discount: discountRequired,
};
