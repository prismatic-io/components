import { action } from "@prismatic-io/spectral";
import { createBasicAuthClient } from "../../client";
import { getFileSummaryExamplePayload } from "../../examplePayloads";
import { getFileSummaryInputs } from "../../inputs";







export const getFileSummary = action({
  display: {
    label: "Get File Summary",
    description: "Fetch a summary of a file submitted to the import tool.",
  },
  inputs: getFileSummaryInputs,
  perform: async (context, { connection, fileId }) => {
    const client = createBasicAuthClient(connection, context.debug.enabled);

    const { data } = await client.get(`/personnel/v1/import-tool/file-summary/${fileId}`);

    return { data };
  },
  examplePayload: getFileSummaryExamplePayload,
});
