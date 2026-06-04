import { dataSource } from "@prismatic-io/spectral";
import { createAssetsClient } from "../client";
import { selectAssetObjectTypeExamplePayload } from "../examplePayloads";
import { selectAssetObjectTypeInputs } from "../inputs";
import type { AssetObjectType } from "../types";
import { toSortedPicklist } from "../util";

export const selectAssetObjectType = dataSource({
  display: {
    label: "Select Asset Object Type",
    description:
      "Fetches all object types in the chosen Assets/CMDB schema and returns them as a dropdown.",
  },
  dataSourceType: "picklist",
  inputs: selectAssetObjectTypeInputs,
  perform: async (_context, { connection, assetSchemaId }) => {
    const { client } = await createAssetsClient(connection, false);
    const { data } = await client.get<AssetObjectType[]>(
      `/objectschema/${assetSchemaId}/objecttypes`,
    );
    const result = toSortedPicklist(
      data,
      (t) => t.name,
      (t) => String(t.id),
    );
    return { result };
  },
  examplePayload: selectAssetObjectTypeExamplePayload,
});
