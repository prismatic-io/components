import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listFollowedSitesExamplePayload } from "../../examplePayloads";
import { listFollowedSitesInputs } from "../../inputs";
import { paginateResults, resolvePagination } from "../../util";
import { listFollowedSitesOutputSchema } from "../../outputSchemas";

export const listFollowedSites = action({
  display: {
    label: "List Followed Sites",
    description: "List all Followed Sites.",
  },
  inputs: listFollowedSitesInputs,
  performSafety: "notAllowed",
  perform: async ({ debug: { enabled: debug } }, params) => {
    const client = await createClient(params.connection, debug);
    const endpoint = "/me/followedSites";

    if (params.fetchAll) {
      const results = await paginateResults(client, endpoint, { returnFullData: true });
      return { data: results };
    }

    const { pageLimit, pageToken } = resolvePagination(params);
    const { data } = await client.get("/me/followedSites", {
      params: pageLimit || pageToken ? { $top: pageLimit, $skipToken: pageToken } : undefined,
    });
    return { data };
  },
  examplePerform: async () => listFollowedSitesExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listFollowedSitesOutputSchema,
  }),
  examplePayload: listFollowedSitesExamplePayload,
});
