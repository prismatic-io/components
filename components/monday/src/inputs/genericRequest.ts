import { input, type KeyValuePair, util } from "@prismatic-io/spectral";
import { CURRENT_API_VERSION } from "../constants";
import { toOptionalString } from "../util";
import { connectionInput } from "./common";

const variablesObject = input({
  label: "Variables Object",
  type: "code",
  language: "json",
  required: false,
  comments:
    "A JSON object of variables to pass to the GraphQL query or mutation. Use this for structured variable input.",
  placeholder: "Enter variables as JSON object",
  example: JSON.stringify({ boardId: 1234567890, limit: 50 }, null, 2),
  clean: (value) => (value ? util.types.toObject(value) : {}),
});

const variables = input({
  label: "Variables",
  type: "string",
  required: false,
  collection: "keyvaluelist",
  comments:
    "Key-value pairs of variables to pass to the GraphQL query or mutation. Use this for simple variable input.",
  placeholder: "Enter variable name",
  clean: (val: unknown) =>
    util.types.keyValPairListToObject(val as KeyValuePair<unknown>[]),
});

const query = input({
  label: "Query or Mutation",
  type: "code",
  required: true,
  language: "graphql",
  comments:
    "The GraphQL query or mutation to execute against the Monday.com API.",
  placeholder: "Enter GraphQL query or mutation",
  default: `{
me {
id
email
}
}`,
  clean: util.types.toString,
});

const apiVersion = input({
  label: "API Version",
  type: "string",
  required: false,
  comments: `The Monday.com API version to use. If not provided, the default ${CURRENT_API_VERSION} version will be used.`,
  placeholder: "Enter API version",
  example: CURRENT_API_VERSION,
  clean: toOptionalString,
});

export const genericRequestInputs = {
  connection: connectionInput,
  query,
  variables,
  variablesObject,
  apiVersion,
};
