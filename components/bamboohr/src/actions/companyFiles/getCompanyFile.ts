import { action } from "@prismatic-io/spectral";
import { createBambooClient } from "../../client";
import { getCompanyFileExamplePayload } from "../../examplePayloads";
import { getCompanyFileInputs } from "../../inputs";

export const getCompanyFile = action({
  display: {
    label: "Get Company File",
    description: "Retrieve a company file.",
  },
  inputs: getCompanyFileInputs,
  perform: async (context, params) => {
    const client = createBambooClient(params.connection, context.debug.enabled);
    const { data, headers } = await client.get(`/v1/files/${params.fileId}`, {
      responseType: "arraybuffer",
    });
    return { data, contentType: headers["content-type"] };
  },
  examplePayload: getCompanyFileExamplePayload,
});
