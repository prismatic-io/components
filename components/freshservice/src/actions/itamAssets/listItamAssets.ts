import { action, outputSchema } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../../client";
import { listItamAssetsExamplePayload as examplePayload } from "../../examplePayloads";
import { listItamAssetsInputs as inputs } from "../../inputs";
import { itamAssetsListOutputSchema } from "../../outputSchemas";
import { getItamListData } from "../../util";
export const listItamAssets = action({
  display: {
    label: "List Assets (ITAM)",
    description: "Returns a list of assets.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, fetchAll, pagination, includeCols },
  ) => {
    const client = createFreshserviceClient(connection, {
      debug: context.debug.enabled,
    });
    const { data, meta } = await getItamListData(client, "assets", "assets", {
      fetchAll,
      params: {
        include_cols: includeCols,
        per_page: pagination.perPage,
        page: pagination.page,
      },
    });
    return { data: { meta, ...data } };
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: itamAssetsListOutputSchema,
  }),
  inputs,
  examplePayload,
});
