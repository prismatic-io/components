import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getRootSiteExamplePayload } from "../../examplePayloads";
import { getRootSiteInputs } from "../../inputs";
import { getRootSiteOutputSchema } from "../../outputSchemas";

export const getRootSite = action({
  display: {
    label: "Get Root Site",
    description: "Returns the information and metadata of the root SharePoint site in the tenant.",
  },
  performSafety: "safe",
  perform: async ({ debug: { enabled: debug } }, params) => {
    const client = await createClient(params.connection, debug);
    const { data } = await client.get("/sites/root");
    return { data };
  },
  inputs: getRootSiteInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getRootSiteOutputSchema,
  }),
  examplePayload: getRootSiteExamplePayload,
});
