import { action } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../../client";
import { listAssetsExamplePayload as examplePayload } from "../../examplePayloads";
import { listAssetsInputs as inputs } from "../../inputs/assets";
import { getListData } from "../../util";

export const listAssets = action({
  display: {
    label: "List Assets",
    description: "Returns a list of all assets.",
  },
  perform: async (
    context,
    { connection, fetchAll, perPage, page, additionalQueryParams },
  ) => {
    const client = createFreshserviceClient(connection, context.debug.enabled);

    const { data } = await getListData(client, `/assets`, "assets", fetchAll, {
      ...additionalQueryParams,
      per_page: perPage,
      page,
    });

    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
