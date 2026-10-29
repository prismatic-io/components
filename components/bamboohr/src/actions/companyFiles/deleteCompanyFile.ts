import { action } from "@prismatic-io/spectral";
import { createBambooClient } from "../../client";
import { deleteCompanyFileExamplePayload } from "../../examplePayloads";
import { deleteCompanyFileInputs } from "../../inputs";

export const deleteCompanyFile = action({
  display: {
    label: "Delete Company File",
    description: "Delete a company file.",
  },
  inputs: deleteCompanyFileInputs,
  perform: async (context, params) => {
    const client = createBambooClient(params.connection, context.debug.enabled);
    const { data } = await client.delete(`/v1/files/${params.fileId}`);
    return { data };
  },
  examplePayload: deleteCompanyFileExamplePayload,
});
