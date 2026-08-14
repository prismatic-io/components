import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ASSETS_PATH } from "../../constants";
import { listAssetsExamplePayload } from "../../examplePayloads";
import { listAssetsInputs } from "../../inputs";
import { listAssetsOutputSchema } from "../../outputSchemas";
import { paginateResults } from "../../util/pagination";
export const listAssets = action({
  examplePayload: listAssetsExamplePayload,
  display: {
    label: "List Assets",
    description: "List Content Builder assets with optional pagination.",
  },
  inputs: listAssetsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listAssetsOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { connection, fetchAll, pagination }) => {
    const client = createClient(connection, context.debug.enabled);
    const params = {
      $pageSize: pagination.pageSize,
      $page: pagination.page,
    };
    const data = await paginateResults(client, ASSETS_PATH, fetchAll, params);
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: listAssetsExamplePayload.data,
  }),
});
