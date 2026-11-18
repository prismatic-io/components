import { action, outputSchema } from "@prismatic-io/spectral";
import { createDuroClient } from "../../client";
import { gql } from "graphql-request";
import { listChangeOrdersInputs } from "../../inputs/orders";
import { N_FIRST_RESULTS_FALLBACK } from "../../constants";
import { listChangeOrdersExamplePayload } from "../../examplePayloads";
import { listChangeOrdersOutputSchema } from "../../outputSchemas";

export const listChangeOrders = action({
  display: {
    label: "List Change Orders",
    description: "Retrieves a list of change orders.",
  },
  inputs: listChangeOrdersInputs,
  performSafety: "notAllowed",
  perform: async (context, { connection, orderBy, first }) => {
    const client = createDuroClient(
      connection,
      context.debug.enabled,
      context.logger,
    );
    const query = gql`
      query ChangeOrders($first: Int, $orderBy: [ChangeOrdersOrderByInput]) {
        changeOrders(orderBy: $orderBy) {
          connection(first: $first) {
            edges {
              node {
                con {
                  id
                  displayValue
                }
                id
                name
                type
                description
                documentLinks {
                  document {
                    id
                    size
                    src
                    name
                    url
                    status
                    created
                  }
                }
                status
                resolution
                erpOptions {
                  effectivity {
                    endDate
                    startDate
                  }
                  itemType {
                    value
                  }
                }
                created
                creator {
                  email
                  id
                  firstName
                  lastName
                }
                approvalType
                lastModified
              }
            }
          }
        }
      }
    `;
    const variables = {
      first: first ?? N_FIRST_RESULTS_FALLBACK,
      orderBy,
    };

    const data = await client.request(query, variables);

    return { data };
  },
  examplePerform: async () => listChangeOrdersExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listChangeOrdersOutputSchema,
  }),
  examplePayload: listChangeOrdersExamplePayload,
});
