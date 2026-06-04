import { action } from "@prismatic-io/spectral";
import { createBasicAuthClient } from "../../client";
import { getFileStatusExamplePayload } from "../../examplePayloads";
import { getFileStatusInputs } from "../../inputs";







export const getFileStatus = action({
  display: {
    label: "Get File Status",
    description: "Fetch the status of a file submitted to the import tool.",
  },
  inputs: getFileStatusInputs,
  perform: async (context, { connection, fileId }) => {
    const client = createBasicAuthClient(connection, context.debug.enabled);

    const { data } = await client.get(`/personnel/v1/import-tool/file-status/${fileId}`);

    return { data };
  },
  examplePayload: getFileStatusExamplePayload,
});
