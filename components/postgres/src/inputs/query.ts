import { input, type KeyValuePair, util } from "@prismatic-io/spectral";
import { connectionInput } from "./common";
export const queryField = input({
  label: "Query Field",
  comments:
    "The SQL statement to execute against the database. Use named parameters (i.e. ${name}) or index variables (i.e. $1) to safely interpolate values.",
  type: "code",
  language: "pgsql",
  placeholder: "Enter a SQL statement",
  required: true,
  example:
    "INSERT INTO users(first_name, last_name, age) VALUES(${firstname}, ${lastname}, ${age})",
});
export const params = input({
  label: "Named Parameters",
  comments: "Optional named parameters to insert into a query.",
  type: "data",
  required: false,
  collection: "keyvaluelist",
  clean: (value: unknown) =>
    value
      ? util.types.keyValPairListToObject(value as KeyValuePair<unknown>[])
      : {},
});
export const paramsObject = input({
  label: "Parameters Object or Array",
  comments:
    "Optional parameters to insert into a query. Use a key-value object for named inputs (i.e. ${name}), or an array for index variables (i.e. $2). Values from this object are merged with the Named Parameters input when named variables are used.",
  type: "code",
  language: "json",
  placeholder: "Enter a JSON object or array",
  required: false,
  example: JSON.stringify({ productId: 123, customerName: "Acme Corp" }),
  clean: (value) => (value ? util.types.toObject(value) : {}),
});
export const queryInputs = {
  postgresConnection: connectionInput,
  queryField,
  params,
  paramsObject,
};
