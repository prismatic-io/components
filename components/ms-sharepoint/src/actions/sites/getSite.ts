import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getSiteExamplePayload } from "../../examplePayloads";
import { getSiteInputs } from "../../inputs";
import { getSiteOutputSchema } from "../../outputSchemas";

export const getSite = action({
  display: {
    label: "Get Site",
    description: "Returns the information and metadata of the given SharePoint site.",
  },
  performSafety: "safe",
  perform: async ({ debug: { enabled: debug } }, params) => {
    const client = await createClient(params.connection, debug);
    const { data } = await client.get(`/sites/${params.siteId}`);
    return { data };
  },
  inputs: getSiteInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getSiteOutputSchema,
  }),
  examplePayload: getSiteExamplePayload,
});
