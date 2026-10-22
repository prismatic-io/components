import { action, outputSchema } from "@prismatic-io/spectral";
import { gql } from "graphql-request";
import { createFluentClient } from "../../client";
import { getCustomerByEmailAddressExamplePayload } from "../../examplePayloads";
import { getCustomerByEmailAddressInputs } from "../../inputs";
import { getCustomerByEmailAddressOutputSchema } from "../../outputSchemas";
export const getCustomerByEmailAddress = action({
  display: {
    label: "Get Customer by Email",
    description: "Find a customer by their email address",
  },
  inputs: getCustomerByEmailAddressInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getCustomerByEmailAddressOutputSchema,
  }),
  performSafety: "safe",
  perform: async (context, params) => {
    const client = await createFluentClient(
      params.connection,
      context.debug.enabled,
      context.logger,
    );
    const query = gql`
      query GetCustomerByEmailAddress($emailAddress: String) {
        customers(primaryEmail: [$emailAddress]) {
          edges {
            node {
              id
              ref
              firstName
              lastName
              username
              primaryEmail
              primaryPhone
              timezone
              attributes {
                name
                type
              }
            }
          }
        }
      }
    `;
    const variables = { emailAddress: params.emailAddress };
    const data = await client.request(query, variables);
    return { data };
  },
  examplePayload: getCustomerByEmailAddressExamplePayload,
});
