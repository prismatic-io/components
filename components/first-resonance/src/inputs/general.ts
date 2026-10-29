import { input, util } from "@prismatic-io/spectral";

export const connection = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The First Resonance ION connection to use.",
});

export const graphQLQuery = input({
  label: "GraphQL Query",
  type: "code",
  required: true,
  language: "graphql",
  comments:
    "The GraphQL query to execute against the ION API. Use the [ION GraphQL Explorer](https://manual.firstresonance.io/api/about-graphql) to build and test queries.",
  example: "query {\n  me {\n    id\n    name\n    email\n  }\n}",
  placeholder: "Enter GraphQL query",
  clean: util.types.toString,
});

export const graphQLVariables = input({
  label: "GraphQL Variables",
  type: "data",
  required: false,
  comments:
    "Optional variables to pass to the GraphQL query. Variables allow you to parameterize your queries for reusability and security.",
});

export const rawRequestInputs = {
  connection,
  query: graphQLQuery,
  variables: graphQLVariables,
};
