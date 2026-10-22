import { action, outputSchema } from "@prismatic-io/spectral";
import { gql } from "graphql-request";
import { createFluentClient } from "../../client";
import { getCurrentUserExamplePayload } from "../../examplePayloads";
import { getCurrentUserInputs } from "../../inputs";
import { getCurrentUserOutputSchema } from "../../outputSchemas";
export const getCurrentUser = action({
  display: {
    label: "Get Current User",
    description: "Get information about the currently authenticated user",
  },
  inputs: getCurrentUserInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getCurrentUserOutputSchema,
  }),
  performSafety: "safe",
  perform: async (context, params) => {
    const client = await createFluentClient(
      params.connection,
      context.debug.enabled,
      context.logger,
    );
    const query = gql`
      {
        me {
          id
          username
          title
          firstName
          lastName
          primaryEmail
          primaryPhone
          type
          status
          attributes {
            name
            type
            value
          }
          department
          country
          timezone
          language {
            value
            label
          }
          promotionOptIn
          primaryRetailer {
            id
            tradingName
          }
          primaryLocation {
            id
            type
            status
            name
          }
          roles {
            role {
              id
              name
              permissions {
                name
              }
            }
          }
          apps {
            id
            name
            version {
              major
              minor
              patch
            }
          }
        }
      }
    `;
    const data = await client.request(query);
    return { data };
  },
  examplePayload: getCurrentUserExamplePayload,
});
