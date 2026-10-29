import { action } from "@prismatic-io/spectral";
import { gql } from "graphql-request";
import { createClient } from "../../client";
import { getAccountIdExamplePayload as examplePayload } from "../../examplePayloads";
import { getAccountIdInputs as inputs } from "../../inputs/account";

export const getAccountId = action({
  display: {
    label: "Get Account ID",
    description: "Retrieve current Account ID.",
  },
  perform: async (context, { connection }) => {
    const query = gql`
      query GetAccountId {
        account {
          id
        }
      }
    `;

    const response = await createClient({
      connection,
      debug: context.debug.enabled,
    }).request(query);

    return {
      data: response,
    };
  },
  inputs,
  examplePayload,
});
