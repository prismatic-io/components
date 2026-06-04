import { dataSource, input, util } from "@prismatic-io/spectral";
import { gql } from "graphql-request";
import { createClient } from "../client";
import { connection } from "../inputs/sharedInputs";
import type { RelatedAssetItem, RelatedAssetsResponse } from "../types";

const assetId = input({
  label: "Asset ID",
  type: "string",
  required: true,
  comments: "ID of the Asset entity.",
  example: "eyJpZG...",
  placeholder: "eyJpZG...",
  clean: util.types.toString,
});

const query = gql`
  query listRelatedAssets($assetId: ID!) {
    asset(id: $assetId) {
      relatedAssets {
        items {
          id
          title
        }
      }
    }
  }
`;

export const selectRelatedAsset = dataSource({
  display: {
    label: "Select Related Asset",
    description: "A picklist of assets related to a specific asset.",
  },
  inputs: {
    connection,
    assetId,
  },
  perform: async (_context, { connection, assetId }) => {
    const client = createClient({ connection, debug: false });
    const response: RelatedAssetsResponse = await client.request(query, {
      assetId,
    });
    const items: RelatedAssetItem[] =
      response?.asset?.relatedAssets?.items ?? [];
    return {
      result: items.map((item) => ({
        key: item.id,
        label: item.title,
      })),
    };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [{ label: "My Asset", key: "eyJpZGVudGlmaWVyIjoiMSJ9" }],
  },
});
