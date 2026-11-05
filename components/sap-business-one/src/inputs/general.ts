import { input, util } from "@prismatic-io/spectral";
import { cleanBodyFields, cleanKeyValueList, cleanString } from "../util";

export const connection = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The SAP Business One connection to use.",
});

export const $select = input({
  label: "Select",
  type: "string",
  comments:
    "A comma-separated list of fields to include in the response. If not provided, all fields will be returned and the query may be slower. See [OData $select documentation](https://help.sap.com/doc/056f69366b5345a386bb8149f1700c19/10.0/en-US/Service%20Layer%20API%20Reference.html) for available fields.",
  example: "ItemCode,ItemName,ForeignName",
  placeholder: "Enter fields to select",
  required: false,
  clean: cleanString,
});

export const $filter = input({
  label: "Filter",
  type: "string",
  comments:
    "An OData filter expression to apply to the request (e.g., startswith, eq, gt). See [OData $filter documentation](https://help.sap.com/doc/056f69366b5345a386bb8149f1700c19/10.0/en-US/Service%20Layer%20API%20Reference.html) for filter syntax.",
  example: "startswith(ItemCode, 'A001')",
  placeholder: "Enter filter expression",
  required: false,
  clean: cleanString,
});

export const $orderby = input({
  label: "Order By",
  type: "string",
  comments:
    "A comma-separated list of fields to sort by. Add 'asc' or 'desc' after field name for sort direction (e.g., ItemCode desc).",
  example: "ItemCode asc",
  placeholder: "Enter fields to sort by",
  required: false,
  clean: cleanString,
});

export const $top = input({
  label: "Top",
  type: "string",
  comments: "The maximum number of items to return. Maximum value is 20.",
  example: "10",
  placeholder: "Enter number of items",
  required: false,
  clean: (value: unknown) => util.types.toNumber(value, 20),
});

export const $skip = input({
  label: "Skip",
  type: "string",
  comments: "The number of items to skip before returning results. Used for pagination.",
  example: "20",
  placeholder: "Enter number to skip",
  required: false,
  clean: (value: unknown) => util.types.toNumber(value, 0),
});

export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  comments:
    "When true, all records will be fetched automatically by paginating through results. When false, only the number of records specified in $top will be returned.",
  required: false,
  clean: util.types.toBool,
});

export const customQueryParams = input({
  label: "Custom Query Params",
  type: "string",
  collection: "keyvaluelist",
  example: "$expand=value",
  required: false,
  comments:
    "Custom query parameters to include in the request, such as $expand for related entities.",
  placeholder: "Enter custom parameters",
  clean: cleanKeyValueList,
});

export const defaultPaginationInputs = {
  fetchAll,
  $top,
  $skip,
  $select,
  $filter,
  $orderby,
  customQueryParams,
};

export const bodyFields = input({
  label: "Body Fields",
  type: "code",
  language: "json",
  comments:
    "Additional fields to include in the request body as a JSON object. These fields will be merged with the other input values.",
  required: false,
  clean: cleanBodyFields,
});

export const keyField = input({
  label: "Key Field",
  type: "string",
  comments: "The field name to use as the value in dropdown options.",
  example: "ItemCode",
  placeholder: "Enter key field name",
  required: true,
  clean: util.types.toString,
});

export const labelField = input({
  label: "Label Field",
  type: "string",
  comments: "The field name to use as the label text in dropdown options.",
  example: "ItemName",
  placeholder: "Enter label field name",
  required: true,
  clean: util.types.toString,
});
