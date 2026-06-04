import { input, util } from "@prismatic-io/spectral";
import { cleanVariablesInput } from "../utils/cleanVariablesInput";
import { connection } from "./sharedInputs";

export const getCurrentUserInputs = {
  connection,
};

export const rawRequestInputs = {
  connection,
  query: input({
    label: "Query or Mutation",
    comments: "Provide a query or mutation for the GraphQL request.",
    type: "code",
    required: true,
    language: "graphql",
    example: `
      query getCurrentUser {
        currentUser {
          id
          email
          name         
        }
      }
    `,
    clean: util.types.toString,
  }),
  variableMap: input({
    label: "GraphQL Variables",
    comments: "These should match the variables of your query or mutation.",
    type: "string",
    collection: "keyvaluelist",
    required: false,
    example: JSON.stringify({ key: "libraryId", value: "eyJpZGVudGl..." }),
    clean: cleanVariablesInput,
  }),
};
