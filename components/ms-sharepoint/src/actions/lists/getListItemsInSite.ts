import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getListItemsInSiteExamplePayload } from "../../examplePayloads";
import { getListItemsInSiteInputs } from "../../inputs";
import { listListItemsOutputSchema } from "../../outputSchemas";
import { resolvePagination } from "../../util";

export const getListItemsInSite = action({
  display: {
    label: "List Items in Site List",
    description: "Return all items inside the given site list.",
  },
  performSafety: "notAllowed",
  perform: async ({ debug: { enabled: debug } }, params) => {
    const client = await createClient(params.connection, debug);
    const { pageLimit, pageToken } = resolvePagination(params);
    const { data } = await client.get(`/sites/${params.siteId}/lists/${params.listId}/items`, {
      params: {
        $top: pageLimit,
        $skipToken: pageToken,
        $select: params.optInFields,
      },
    });
    return { data };
  },
  examplePerform: async () => getListItemsInSiteExamplePayload,
  inputs: getListItemsInSiteInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listListItemsOutputSchema,
  }),
  examplePayload: getListItemsInSiteExamplePayload,
});
