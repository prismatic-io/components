import { input, util } from "@prismatic-io/spectral";
import { cleanString } from "../util";
export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The Firebase connection to use.",
});
export const collection = input({
  label: "Collection",
  placeholder: "Enter collection name",
  type: "string",
  required: true,
  comments: "Provide a string value for the collection name.",
  example: "Customers",
  dataSource: "selectCollection",
  clean: util.types.toString,
});
export const orderBy = input({
  label: "Order By",
  placeholder: "Enter field name",
  type: "string",
  required: false,
  comments: "Provide a string value for the field to order by.",
  example: "Name",
  clean: cleanString,
});
export const queryOperatorCode = input({
  label: "Query Operators",
  type: "code",
  required: false,
  language: "json",
  placeholder: "Enter query conditions as a JSON array",
  comments:
    "A JSON array of filter conditions to apply to the query. Each condition is an object with field, operator, and value keys, and all conditions must match. Supported operators are the Cloud Firestore where-clause operators, such as ==, !=, in, not-in, and array-contains. A null value can only be compared with == or !=.",
  example: JSON.stringify(
    [
      {
        field: "myFieldName",
        operator: "!=",
        value: "myFieldValue",
      },
      {
        field: "myOtherFieldName",
        operator: "not-in",
        value: ["myOtherFieldValue1", "myOtherFieldValue2"],
      },
    ],
    null,
    2,
  ),
  clean: util.types.toString,
});
