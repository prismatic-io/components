import { input, util } from "@prismatic-io/spectral";
import { connectionInput } from "./common";

const queryField = input({
  label: "Query",
  type: "code",
  language: "mysql",
  default: "SELECT * FROM `table` WHERE `name` = ? AND `age` > ?",
  comments:
    "The SQL query to execute against the MySQL server. Use '?' placeholders for parameterized values.",
  example: "SELECT * FROM users WHERE id = ?",
  placeholder: "Enter SQL query",
  required: true,
  clean: util.types.toString,
});

const params = input({
  label: "Parameters",
  comments:
    "The ordered list of values to bind to '?' placeholders in the query. Use this when the number of parameters is known at design time. Use either Parameters or Reference Parameters, not both.",
  type: "string",
  required: false,
  placeholder: "Enter parameter value",
  collection: "valuelist",
  clean: (value: unknown) => value as string[],
});

const referenceParams = input({
  label: "Reference Parameters",
  comments:
    "A JSON array of values to bind to '?' placeholders, referenced from a previous step. Use this when the number of parameters is determined at runtime. Use either Parameters or Reference Parameters, not both.",
  type: "code",
  language: "javascript",
  placeholder: "Enter JSON array of parameter values",
  required: false,
  example: JSON.stringify(["foo", "bar"]),
  clean: (values: unknown) => {
    if (!values) {
      return undefined;
    }
    const params = util.types.toObject(values);
    if (!Array.isArray(params)) {
      throw new Error(`Reference parameters must be an array. Got ${params}`);
    }
    return params;
  },
});

export const queryInputs = {
  mySQLConnection: connectionInput,
  queryField,
  params,
  referenceParams,
};
