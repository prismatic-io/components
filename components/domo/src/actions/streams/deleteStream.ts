import { action } from "@prismatic-io/spectral";
import { getDomoClient } from "../../client";
import { deleteStreamInputs } from "../../inputs";
import { deleteStreamExamplePayload } from "../../examplePayloads";

export const deleteStream = action({
  display: {
    label: "Delete Stream",
    description:
      "Deletes a stream from a Domo instance without deleting the associated DataSet.",
  },
  examplePayload: deleteStreamExamplePayload,
  perform: async (context, { connection, streamId }) => {
    const client = await getDomoClient(connection, context.debug.enabled);
    const { data } = await client.delete(`/streams/${streamId}`);
    return { data };
  },
  inputs: deleteStreamInputs,
});

export default { deleteStream };
