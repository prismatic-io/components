import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ASSET_QUERY_PATH } from "../../constants";
import { queryAssetsExamplePayload } from "../../examplePayloads";
import { queryAssetsInputs } from "../../inputs";

export const queryAssets = action({
  examplePayload: queryAssetsExamplePayload,
  display: {
    label: "Query Assets",
    description:
      "Search Content Builder assets using the query API with filters and sorting.",
  },
  inputs: queryAssetsInputs,
  perform: async (
    context,
    { connection, assetQuery, assetFields, pageSize, page },
  ) => {
    const client = createClient(connection, context.debug.enabled);

    const body = {
      page: { page, pageSize },
      ...(assetQuery && { query: assetQuery }),
      ...(assetFields && {
        fields: assetFields.split(",").map((f: string) => f.trim()),
      }),
    };

    const { data } = await client.post(ASSET_QUERY_PATH, body);

    return { data };
  },
});
