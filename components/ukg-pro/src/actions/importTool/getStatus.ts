import { action } from "@prismatic-io/spectral";
import { createBasicAuthClient } from "../../client";
import { getImportStatusExamplePayload } from "../../examplePayloads";
import { getImportStatusInputs } from "../../inputs";







export const getStatus = action({
  display: {
    label: "Get Import Status",
    description: "Retrieve the status of an import tool transaction using the staging ID.",
  },
  inputs: getImportStatusInputs,
  perform: async (context, { connection, stagingId }) => {
    const client = createBasicAuthClient(connection, context.debug.enabled);

    const { data } = await client.get(`/personnel/v1/import-tool/status/${stagingId}`);

    return { data };
  },
  examplePayload: getImportStatusExamplePayload,
});
