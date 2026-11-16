import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createItemInSiteExamplePayload } from "../../examplePayloads";
import { createItemInSiteInputs } from "../../inputs";
import { createListItemOutputSchema } from "../../outputSchemas";

export const createItemInSite = action({
  display: {
    label: "Create Item in Site List",
    description: "Create a new item inside the given site list.",
  },
  performSafety: "notAllowed",
  perform: async ({ debug: { enabled: debug } }, params) => {
    const client = await createClient(params.connection, debug);
    const { data } = await client.post(`/sites/${params.siteId}/lists/${params.listId}/items`, {
      fields: params.fields,
    });
    return { data };
  },
  examplePerform: async () => createItemInSiteExamplePayload,
  inputs: createItemInSiteInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createListItemOutputSchema,
  }),
  examplePayload: createItemInSiteExamplePayload,
});
