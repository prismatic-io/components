import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { listAssetsDatasource } from "../examplePayloads";
import { connectionInput } from "../inputs";
import type { Asset } from "../interfaces";
import { paginateData } from "../util";

export const selectAsset = dataSource({
  display: {
    label: "Select Asset",
    description: "Select an asset from the list of assets.",
  },
  inputs: {
    connection: connectionInput,
  },
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false);
    const data = await paginateData(
      client,
      "assets",
      undefined,
      undefined,
      true,
      undefined,
    );
    const result = (data.assets as Asset[]).map<Element>((asset) => ({
      label: asset.name,
      key: asset.id,
    }));
    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: listAssetsDatasource,
});
