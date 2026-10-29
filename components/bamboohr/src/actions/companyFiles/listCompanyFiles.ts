import { action } from "@prismatic-io/spectral";
import { createBambooClient } from "../../client";
import { listCompanyFilesExamplePayload } from "../../examplePayloads";
import { listCompanyFilesInputs } from "../../inputs";

export const listCompanyFiles = action({
  display: {
    label: "List Company Files",
    description: "List all company file categories and files.",
  },
  inputs: listCompanyFilesInputs,
  perform: async (context, params) => {
    const client = createBambooClient(params.connection, context.debug.enabled);
    const { data } = await client.get("/v1/files/view");
    return { data };
  },
  examplePayload: listCompanyFilesExamplePayload,
});
