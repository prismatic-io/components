import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listSiteListsExamplePayload } from "../../examplePayloads";
import { listSiteListsInputs } from "../../inputs";
import { paginateResults } from "../../util";
import { listSiteListsOutputSchema } from "../../outputSchemas";

export const listSiteLists = action({
  display: {
    label: "List Site Lists",
    description: "List all Site Lists.",
  },
  inputs: listSiteListsInputs,
  performSafety: "notAllowed",
  perform: async ({ debug: { enabled: debug } }, params) => {
    const client = await createClient(params.connection, debug);
    const endpoint = `/sites/${params.siteId}/lists`;

    if (params.fetchAll) {
      const results = await paginateResults(client, endpoint, { returnFullData: true });
      return { data: results };
    }

    const { data } = await client.get(endpoint);
    return { data };
  },
  examplePerform: async () => listSiteListsExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listSiteListsOutputSchema,
  }),
  examplePayload: listSiteListsExamplePayload,
});
