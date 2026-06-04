import { input, util } from "@prismatic-io/spectral";

export const queryString = input({
  label: "Query String",
  placeholder: "Enter query string",
  comments:
    "Must be a valid query string as defined by the QuickBooks API. Single quotes must be escaped with a backslash.",
  type: "string",
  required: true,
  example: "select * from department",
  clean: util.types.toString,
});

export const queryParams = input({
  label: "Query Params",
  type: "string",
  required: false,
  collection: "keyvaluelist",
  comments:
    "Query parameters to filter report results. Available parameters: customer, vendor, end_date, date_macro, class, sort_order, summarize_column_id, department, accounting_method, and start_date.",
});
