import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ASSETS_PATH } from "../../constants";
import { listAssetsExamplePayload } from "../../examplePayloads";
import { listAssetsInputs } from "../../inputs";
import { paginateResults } from "../../util/pagination";

export const listAssets = action({
  examplePayload: listAssetsExamplePayload,
  display: {
    label: "List Assets",
    description: "List Content Builder assets with optional pagination.",
  },
  inputs: listAssetsInputs,
  perform: async (context, { connection, fetchAll, pageSize, page }) => {
    const client = createClient(connection, context.debug.enabled);

    const params = {
      $pageSize: pageSize,
      $page: page,
    };

    const data = await paginateResults(client, ASSETS_PATH, fetchAll, params);

    return { data };
  },
});
