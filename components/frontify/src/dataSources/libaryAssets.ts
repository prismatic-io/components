import { dataSource } from "@prismatic-io/spectral";
import { listLibraryAssetsQuery } from "../actions/libraries/listLibraryAssets";
import type ListLibraryAssetsResponse from "../actions/types/listLibraryAssets";
import { createClient } from "../client";
import { libraryAssetsInputs as inputs } from "../inputs/dataSources";

export const libraryAssetDataSource = dataSource({
  display: {
    label: "Select Library Asset",
    description: "Select an Asset that belongs to a given Library.",
  },
  perform: async (_context, { connection, libraryId }) => {
    const response: ListLibraryAssetsResponse = await createClient({
      connection,
      debug: false,
    }).request(listLibraryAssetsQuery, { libraryId });
    const result = response.library.assets.items.map((asset) => {
      return {
        key: asset.id,
        label: asset.title,
      };
    });

    return {
      result,
    };
  },
  inputs,
  dataSourceType: "picklist",
});
