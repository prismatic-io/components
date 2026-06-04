import { action } from "@prismatic-io/spectral";
import { getDomoClient } from "../../client";
import { uploadDataPartInputs } from "../../inputs";
import { uploadDataPartExamplePayload } from "../../examplePayloads";

export const uploadDataPart = action({
  display: {
    label: "Upload Data Part",
    description:
      "Uploads a data part within a stream execution to add rows to the DataSet.",
  },
  examplePayload: uploadDataPartExamplePayload,
  perform: async (context, { connection, streamId, executionId, partId }) => {
    const client = await getDomoClient(connection, context.debug.enabled);
    const { data } = await client.put(
      `/streams/${streamId}/executions/${executionId}/part/${partId}`,
      undefined,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    );
    return { data };
  },
  inputs: uploadDataPartInputs,
});

export default { uploadDataPart };
