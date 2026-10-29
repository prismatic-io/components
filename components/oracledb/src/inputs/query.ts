import { input, type KeyValuePair, util } from "@prismatic-io/spectral";
import { connectionInput } from "./common";

const query = input({
  label: "SQL Query",
  type: "code",
  language: "sql",
  required: true,
  comments:
    "The SQL statement to execute against the database. Use named parameters (e.g. ':name') to safely bind values supplied through the parameter inputs.",
  placeholder: "Enter a SQL query",
  default: "SELECT * FROM mytable WHERE name = :name AND company = :company_id",
  clean: util.types.toString,
});

const namedParameters = input({
  label: "Named Parameters",
  comments:
    "Optional named parameters to insert into a query. Ensure the keys of these parameters match parameters in the query. For example, if the query contains ':company_name', give this parameter the key 'company_name'. Values specified here are merged with values supplied from the 'Named Parameters Object' input.",
  type: "string",
  required: false,
  collection: "keyvaluelist",
  clean: (value: unknown) =>
    value
      ? util.types.keyValPairListToObject(value as KeyValuePair<unknown>[])
      : {},
});

const namedParametersObject = input({
  label: "Named Parameters Object",
  comments:
    "Optional named parameters to insert into a query. Ensure the keys of these parameters match parameters in the query. For example, if the query contains ':company_name', the object should contain a key 'company_name'. Values in this object are merged with values supplied from the 'Named Parameters' input.",
  type: "code",
  language: "json",
  required: false,
  example: JSON.stringify({ product_id: 123, customer_name: "Acme Corp" }),
  clean: (value) => (value ? util.types.toObject(value) : {}),
});

export const queryInputs = {
  connection: connectionInput,
  query,
  namedParameters,
  namedParametersObject,
};
