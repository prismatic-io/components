import { action, outputSchema } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../../client";
import { listAssetsExamplePayload as examplePayload } from "../../examplePayloads";
import { listAssetsInputs as inputs } from "../../inputs";
import { assetsListOutputSchema } from "../../outputSchemas";
import { getListData } from "../../util";
export const listAssets = action({
  display: {
    label: "List Assets (Deprecated)",
    description:
      "Returns a list of all assets. Applies to Freshservice accounts created before the March 31, 2026 IT Asset Management release.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, fetchAll, pagination, additionalQueryParams },
  ) => {
    const client = createFreshserviceClient(connection, {
      debug: context.debug.enabled,
    });
    const { data } = await getListData(client, `/assets`, "assets", {
      fetchAll,
      params: {
        ...additionalQueryParams,
        per_page: pagination.perPage,
        page: pagination.page,
      },
    });
    return {
      data,
    };
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: assetsListOutputSchema,
  }),
  inputs,
  examplePayload,
});
