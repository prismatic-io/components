import { action } from "@prismatic-io/spectral";
import { gql } from "graphql-request";
import { createClient } from "../../client";
import { getCurrentUserExamplePayload as examplePayload } from "../../examplePayloads";
import { getCurrentUserInputs as inputs } from "../../inputs/misc";

export const getCurrentUser = action({
  display: {
    label: "Get Current User",
    description: "Get the current User.",
  },
  perform: async (context, { connection }) => {
    const query = gql`
      query getCurrentUser {
        currentUser {
          id
          email
          name
          avatar
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
