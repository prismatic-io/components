import { dataSource } from "@prismatic-io/spectral";
import { createAssetsClient } from "../client";
import { selectAssetSchemaExamplePayload } from "../examplePayloads";
import { selectAssetSchemaInputs } from "../inputs";
import type { AssetSchema, AssetsPagedResponse } from "../types";
import { getAssetsPaginatedData, toSortedPicklist } from "../util";

export const selectAssetSchema = dataSource({
  display: {
    label: "Select Asset Schema",
    description:
      "Fetches all Assets/CMDB object schemas and returns them as a dropdown.",
  },
  dataSourceType: "picklist",
  inputs: selectAssetSchemaInputs,
  perform: async (_context, { connection }) => {
    const { client } = await createAssetsClient(connection, false);
    const { data }: { data: AssetsPagedResponse<AssetSchema> } =
      await getAssetsPaginatedData<AssetSchema>(
        client,
        "/objectschema/list",
        true,
      );
    const result = toSortedPicklist(
      data.values,
      (s) => s.name,
      (s) => s.id,
    );
    return { result };
  },
  examplePayload: selectAssetSchemaExamplePayload,
});
