import { action, outputSchema } from "@prismatic-io/spectral";
import { gql } from "graphql-request";
import { createChangeOrderInputs } from "../../inputs/orders";
import { createDuroClient } from "../../client";
import { createChangeOrderExamplePayload } from "../../examplePayloads";
import { createChangeOrderOutputSchema } from "../../outputSchemas";

export const createChangeOrder = action({
  display: {
    label: "Create Change Order",
    description: "Creates a draft change order.",
  },
  inputs: createChangeOrderInputs,
  performSafety: "notAllowed",
  perform: async (context, { connection, name, description, type }) => {
    const client = createDuroClient(
      connection,
      context.debug.enabled,
      context.logger,
    );
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
  examplePerform: async (_context, { name, description, type }) => ({
    data: {
      ...createChangeOrderExamplePayload.data,
      createChangeOrder: {
        ...createChangeOrderExamplePayload.data.createChangeOrder,
        name,
        description: description ?? null,
        type,
      },
    },
  }),
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createChangeOrderOutputSchema,
  }),
  examplePayload: createChangeOrderExamplePayload,
});
