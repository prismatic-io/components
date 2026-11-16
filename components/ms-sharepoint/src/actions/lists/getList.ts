import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getListExamplePayload } from "../../examplePayloads";
import { getListInputs } from "../../inputs";
import { getListOutputSchema } from "../../outputSchemas";

export const getList = action({
  display: {
    label: "Get Site List",
    description: "Returns the information and metadata of an existing site list.",
  },
  inputs: getListInputs,
  performSafety: "safe",
  perform: async ({ debug: { enabled: debug } }, params) => {
    const client = await createClient(params.connection, debug);
    const { data } = await client.get(`/sites/${params.siteId}/lists/${params.listId}`);
    return { data };
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getListOutputSchema,
  }),
  examplePayload: getListExamplePayload,
});
