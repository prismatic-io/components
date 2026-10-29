import { action, outputSchema } from "@prismatic-io/spectral";
import { gql, type Variables } from "graphql-request";
import { createFluentClient } from "../../client";
import { createCustomerExamplePayload } from "../../examplePayloads";
import { createCustomerInputs } from "../../inputs";
import { createCustomerOutputSchema } from "../../outputSchemas";

export const createCustomer = action({
  display: {
    label: "Create Customer",
    description: "Create a new customer",
  },
  inputs: createCustomerInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createCustomerOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = await createFluentClient(
      params.connection,
      context.debug.enabled,
      context.logger,
    );

    const query = gql`
      mutation createCustomer(
        $retailerId: ID!
        $customerEmail: String!
        $firstName: String!
        $lastName: String
        $phoneNumber: String
        $country: String
        $timezone: String
        $attributes: [AttributeInput]
        $promotionOptIn: Boolean!
      ) {
        createCustomer(
          input: {
            username: $customerEmail
            firstName: $firstName
            lastName: $lastName
            primaryEmail: $customerEmail
            primaryPhone: $phoneNumber
            promotionOptIn: $promotionOptIn
            timezone: $timezone
            country: $country
            retailer: { id: $retailerId }
            attributes: $attributes
          }
        ) {
          id
          username
          primaryEmail
          primaryPhone
          firstName
          lastName
          timezone
          country
          promotionOptIn
          retailer {
            id
          }
          attributes {
            name
            type
            value
          }
        }
      }
    `;

    const variables: Variables = {
      retailerId: params.retailerId,
      customerEmail: params.customerEmail,
      firstName: params.firstName,
      lastName: params.lastName,
      phoneNumber: params.phoneNumber,
      promotionOptIn: params.promotionOptIn,
      country: params.country,
      timezone: params.timezone,
      attributes: params.attributes,
    };

    const data = await client.request(query, variables);
    return { data };
  },
  examplePerform: async (): Promise<{ data: unknown }> =>
    createCustomerExamplePayload,
  examplePayload: createCustomerExamplePayload,
});
