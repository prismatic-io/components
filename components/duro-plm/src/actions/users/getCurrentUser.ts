import { action } from "@prismatic-io/spectral";

import { createDuroClient } from "../../client";
import { gql } from "graphql-request";
import { getCurrentUserInputs } from "../../inputs/users";
import { getCurrentUserExamplePayload } from "../../examplePayloads";

export const getCurrentUser = action({
  display: {
    label: "Get Current User",
    description: "Get information about the currently authenticated user",
  },
  inputs: getCurrentUserInputs,
  perform: async (context, { connection }) => {
    const client = createDuroClient(connection, context.debug.enabled);
    const query = gql`
      query UserById {
        userById {
          lastName
          email
          firstName
          id
          primaryCompany {
            id
            name
          }
        }
      }
    `;
    const data = await client.request(query);
    return { data };
  },
  examplePayload: getCurrentUserExamplePayload,
});
