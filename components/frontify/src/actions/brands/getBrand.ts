import { action } from "@prismatic-io/spectral";
import { gql } from "graphql-request";
import { createClient } from "../../client";
import { getBrandExamplePayload as examplePayload } from "../../examplePayloads";
import { getBrandInputs as inputs } from "../../inputs/brands";

export const getBrand = action({
  display: {
    label: "Get Brand",
    description: "Retrieve a Brand by its ID.",
  },
  perform: async (context, { connection, brandId }) => {
    const query = gql`
      query getBrand($brandId: ID!) {
        brand(id: $brandId) {
          id
          name
          rgbaColor {
            red
            green
            blue
            alpha
          }
          avatar
          slug
          customMetadataProperties {
            id
            creator {
              id
              name
              email
            }
            createdAt
            modifier {
              id
              name
              email
            }
            modifiedAt
            name
            type {
              name
            }
            isRequired
            defaultValue
          }
        }
      }
    `;
    const response = await createClient({
      connection,
      debug: context.debug.enabled,
    }).request(query, { brandId });

    return {
      data: response,
    };
  },
  inputs,
  examplePayload,
});
