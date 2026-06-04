import { action } from "@prismatic-io/spectral";
import { gql } from "graphql-request";
import { createClient } from "../../client";
import { listBrandsExamplePayload as examplePayload } from "../../examplePayloads";
import { listBrandsInputs as inputs } from "../../inputs/brands";
import type ListBrandsResponse from "../types/listBrands";

export const listBrandsQuery = gql`
  query listBrands {
    brands {
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





export const listBrands = action({
  display: {
    label: "List Brands",
    description: "Retrieve Brand list for current Account.",
  },
  perform: async (
    context,
    { connection },
  ): Promise<{ data: ListBrandsResponse }> => {
    const response: ListBrandsResponse = await createClient({
      connection,
      debug: context.debug.enabled,
    }).request(listBrandsQuery);

    return {
      data: response,
    };
  },
  inputs,
  examplePayload,
});
