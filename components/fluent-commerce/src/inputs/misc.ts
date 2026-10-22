import { input, type KeyValuePair, util } from "@prismatic-io/spectral";
import { toOptionalObject } from "../util";
import { connectionInput } from "./common";
const query = input({
  label: "Query or Mutation",
  type: "code",
  required: true,
  language: "graphql",
  default: `{
  me {
    id
    username
    primaryEmail
  }
}`,
  placeholder: "Enter GraphQL query or mutation",
  clean: util.types.toString,
  comments: "The GraphQL query or mutation to send to the Fluent Commerce API.",
});
const variables = input({
  label: "Variables",
  type: "string",
  required: false,
  collection: "keyvaluelist",
  clean: (val: unknown) =>
    util.types.keyValPairListToObject(val as KeyValuePair[]),
  comments: "Key-value pairs passed to the query as GraphQL variables.",
});
const variablesObject = input({
  label: "Variables Object",
  type: "code",
  language: "json",
  required: false,
  example: '{"retailerId": "34"}',
  placeholder: "Enter GraphQL variables as JSON",
  clean: toOptionalObject,
  comments:
    "A JSON object of GraphQL variables, for values that are not strings. Merged with Variables; on a shared key, this value wins.",
});
export const genericRequestInputs = {
  connection: connectionInput,
  query,
  variables,
  variablesObject,
};
export const getCurrentUserInputs = { connection: connectionInput };
