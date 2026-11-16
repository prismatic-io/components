import { action, outputSchema } from "@prismatic-io/spectral";
import { createBambooClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { listCompanyFilesExamplePayload } from "../../examplePayloads";
import { listCompanyFilesInputs } from "../../inputs";
import { listCompanyFilesOutputSchema } from "../../outputSchemas";

export const listCompanyFiles = action({
  display: {
    label: "List Company Files",
    description: "List all company file categories and files.",
  },
  inputs: listCompanyFilesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listCompanyFilesOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = createBambooClient(params.connection, context.debug.enabled);
    const { data } = await client.get(ENDPOINTS.FILES_VIEW);
    return { data };
  },
  examplePerform: async () => listCompanyFilesExamplePayload,
  examplePayload: listCompanyFilesExamplePayload,
});
