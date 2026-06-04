import { action } from "@prismatic-io/spectral";
import { gql } from "graphql-request";
import { createChangeOrderInputs } from "../../inputs/orders";
import { createDuroClient } from "../../client";
import { createChangeOrderExamplePayload } from "../../examplePayloads";

export const createChangeOrder = action({
  display: {
    label: "Create Change Order",
    description: "Creates a draft change order.",
  },
  inputs: createChangeOrderInputs,
  perform: async (context, { connection, name, description, type }) => {
    const client = createDuroClient(connection, context.debug.enabled);
    const query = gql`
      mutation CreateChangeOrder($input: CreateChangeOrderInput) {
        createChangeOrder(input: $input) {
          id
          con {
            displayValue
          }
          description
          name
          status
          type
          created
          creator {
            email
            id
            firstName
            lastName
          }
        }
      }
    `;
    const variables = {
      input: {
        name,
        description,
        type,
      },
    };
    const data = await client.request(query, variables);
    return { data };
  },
  examplePayload: createChangeOrderExamplePayload,
});
