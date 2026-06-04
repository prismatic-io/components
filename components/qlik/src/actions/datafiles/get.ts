import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getDataFileExamplePayload } from "../../examplePayloads";
import { connectionInput, dataFileId } from "../../inputs";

export const getDataFile = action({
  display: {
    label: "Get Data File",
    description: "Get descriptive info for the specified data file.",
  },
  examplePayload: getDataFileExamplePayload,
  perform: async (context, { connection, dataFileId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/data-files/${dataFileId}`);

    return {
      data,
    };
  },
  inputs: {
    connection: connectionInput,
    dataFileId,
  },
});
