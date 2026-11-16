import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getItemInSiteExamplePayload } from "../../examplePayloads";
import { getItemInSiteInputs } from "../../inputs";
import { getListItemOutputSchema } from "../../outputSchemas";

export const getItemInSite = action({
  display: {
    label: "Get Item from Site List",
    description: "Returns the information and metadata of the given item.",
  },
  performSafety: "safe",
  perform: async ({ debug: { enabled: debug } }, params) => {
    const client = await createClient(params.connection, debug);
    const { data } = await client.get(
      `/sites/${params.siteId}/lists/${params.listId}/items/${params.itemId}`,
      {
        params: params.optInFields
          ? {
              $select: params.optInFields,
            }
          : undefined,
      },
    );
    return { data };
  },
  inputs: getItemInSiteInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getListItemOutputSchema,
  }),
  examplePayload: getItemInSiteExamplePayload,
});
