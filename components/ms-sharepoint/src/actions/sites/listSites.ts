import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listSitesExamplePayload } from "../../examplePayloads";
import { listSitesInputs } from "../../inputs";
import { paginateResults, resolvePagination } from "../../util";
import { listSitesOutputSchema } from "../../outputSchemas";

export const listSites = action({
  display: {
    label: "List Sites",
    description: "List all SharePoint sites.",
  },
  performSafety: "notAllowed",
  perform: async ({ debug: { enabled: debug } }, params) => {
    const client = await createClient(params.connection, debug);
    const endpoint = "/sites";

    if (params.fetchAll) {
      const results = await paginateResults(client, `${endpoint}?search=`, {
        returnFullData: true,
      });
      return { data: results };
    }

    const { pageLimit, pageToken } = resolvePagination(params);
    const { data } = await client.get(endpoint, {
      params:
        pageLimit || pageToken
          ? { search: "", $top: pageLimit, $skipToken: pageToken }
          : { search: "" },
    });
    return { data };
  },
  examplePerform: async () => listSitesExamplePayload,
  inputs: listSitesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listSitesOutputSchema,
  }),
  examplePayload: listSitesExamplePayload,
});
