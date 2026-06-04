import { action } from "@prismatic-io/spectral";
import { getComponentByIdInputs } from "../../inputs/components";
import { createDuroClient } from "../../client";
import { gql } from "graphql-request";
import { getComponentByIdExamplePayload } from "../../examplePayloads";

export const getComponentById = action({
  display: {
    label: "Get Component by ID",
    description: "Get a specific component by a unique identifier",
  },
  inputs: getComponentByIdInputs,
  perform: async (context, { connection, componentId }) => {
    const client = createDuroClient(connection, context.debug.enabled);
    const query = gql`
      query ComponentsByIds($ids: [ID]) {
        componentsByIds(ids: $ids) {
          id
          cpn {
            displayValue
          }
          created
          category
          archived
          customSpecs {
            key
            specId
            value
          }
          description
          documentLinks {
            document {
              src
              name
              mime
              id
              archived
              url
            }
            specs {
              status
              type
              revision
              lastModified
            }
          }
          eid
          family
          images {
            mime
            creator {
              email
            }
            name
            src
          }
          legacyCpn
          lastModified
          manufacturers {
            name
            description
            mpn {
              key
              src
            }
          }
          name
          primarySource {
            dpn
            distributor
            manufacturer
            minQuantity
            mpn
            unitPrice
          }
          specs {
            key
            value
          }
          status
          revisionValue
          workflowState
          vendorId
          creator {
            id
            email
            firstName
            lastName
          }
          revisionHistory {
            id
            cpn {
              displayValue
            }
            revisionValue
          }
          children {
            component {
              id
            }
          }
          modified
          imageIds
        }
      }
    `;
    const variables = {
      ids: [componentId],
    };

    const data = await client.request(query, variables);

    return { data };
  },
  examplePayload: getComponentByIdExamplePayload,
});
