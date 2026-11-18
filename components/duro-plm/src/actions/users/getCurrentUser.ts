import { action, outputSchema } from "@prismatic-io/spectral";

import { createDuroClient } from "../../client";
import { gql } from "graphql-request";
import { getCurrentUserInputs } from "../../inputs/users";
import { getCurrentUserExamplePayload } from "../../examplePayloads";
import { getCurrentUserOutputSchema } from "../../outputSchemas";

export const getCurrentUser = action({
  display: {
    label: "Get Current User",
    description: "Get information about the currently authenticated user",
  },
  inputs: getCurrentUserInputs,
  performSafety: "safe",
  perform: async (context, { connection }) => {
    const client = createDuroClient(
      connection,
      context.debug.enabled,
      context.logger,
    );
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
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getCurrentUserOutputSchema,
  }),
  examplePayload: getCurrentUserExamplePayload,
});
