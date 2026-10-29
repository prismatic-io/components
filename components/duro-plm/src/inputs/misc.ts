import { input } from "@prismatic-io/spectral";
import { connection } from "./common";
import {
  cleanCodeInput,
  cleanKeyValueListInput,
  cleanStringInput,
} from "../util";
import { GRAPHQL_EXAMPLE } from "../constants";

const query = input({
  label: "Query or Mutation",
  type: "code",
  required: true,
  language: "graphql",
  comments:
    "GraphQL query or mutation to execute against the Duro API. See the Duro GraphQL API documentation for available queries and mutations.",
  placeholder: "Enter GraphQL query or mutation",
  default: GRAPHQL_EXAMPLE,
  example: GRAPHQL_EXAMPLE,
  clean: cleanStringInput,
});

const variables = input({
  label: "Variables",
  type: "string",
  required: false,
  collection: "keyvaluelist",
  comments:
    "GraphQL variables to pass to the query or mutation. Each variable should be a key-value pair.",
  example: '{"userId": "12345", "status": "active"}',
  placeholder: "Enter key-value pairs",
  clean: cleanKeyValueListInput,
});

const variablesObject = input({
  label: "Variables Object",
  type: "code",
  comments:
    "Alternative way to provide GraphQL variables as a JSON object. Use this instead of the Variables field for complex nested variables.",
  placeholder: "Enter GraphQL variables as JSON",
  example: JSON.stringify({ key1: "value1", key2: "value2" }, null, 2),
  language: "json",
  required: false,
  clean: cleanCodeInput,
});

export const rawRequestInputs = {
  connection,
  query,
  variables,
  variablesObject,
};
