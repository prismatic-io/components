import { action, outputSchema } from "@prismatic-io/spectral";
import { getPageOutputSchema } from "../../outputSchemas";
import { createClient } from "../../client";
import { getPageExamplePayload } from "../../examplePayloads";
import { getPageInputs } from "../../inputs";
export const getPage = action({
  display: {
    label: "Get Page",
    description: "Retrieve a page by ID with optional property filters",
  },
  inputs: getPageInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getPageOutputSchema,
  }),
  performSafety: "safe",
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);
    const filterProperties = params.filterProperties as string;
    const filterParams = filterProperties
      ? { params: { filter_properties: filterProperties.split(",") } }
      : {};
    const { data } = await client.get(`/pages/${params.pageId}`, filterParams);
    return { data };
  },
  examplePayload: getPageExamplePayload,
});
