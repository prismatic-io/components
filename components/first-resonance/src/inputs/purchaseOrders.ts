import { input, util } from "@prismatic-io/spectral";
import { CREATE_PO } from "../constants";
import { print } from "graphql";
import { connection, graphQLVariables } from "./general";

export const queryInput = input({
  label: "Query",
  type: "code",
  required: true,
  language: "graphql",
  comments:
    "The GraphQL mutation to create a purchase order in ION. This uses the createPurchaseOrder mutation from the ION API.",
  example: print(CREATE_PO),
  placeholder: "Enter GraphQL query or mutation",
  clean: util.types.toString,
});

export const createPurchaseOrderFromQuickbooksInputs = {
  connection,
  variables: graphQLVariables,
  queryInput,
};
