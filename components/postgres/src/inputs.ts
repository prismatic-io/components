import { input, KeyValuePair, util } from "@prismatic-io/spectral";

export const queryField = input({
  label: "Query Field",
  comments: "The query to be executed",
  type: "code",
  language: "pgsql",
  placeholder: "Query Field",
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
    "Optional parameters to insert into a query. This should be a key-value object if you are using named inputs (i.e. ${name}), or an array if using index variables (i.e. $2) in your query. Values from this object will be merged with Named Parameters inputs if you are using named variables.",
  type: "code",
  language: "json",
  required: false,
  example: JSON.stringify({ productId: 123, customerName: "Acme Corp" }),
  clean: (value) => (value ? util.types.toObject(value) : {}),
});

export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
});
