import { action } from "@prismatic-io/spectral";
import { getDomoClient } from "../../client";
import { getStreamExamplePayload } from "../../examplePayloads";
import { getStreamInputs } from "../../inputs";

export const getStream = action({
  display: {
    label: "Get Stream",
    description: "Retrieves the details of an existing stream.",
  },
  examplePayload: getStreamExamplePayload,
  perform: async (context, { connection, streamId, fields }) => {
    const client = await getDomoClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `/streams/${streamId}
    ${fields.length ? `?fields=${fields}` : ""}`,
      {
        headers: { Accept: "application/json" },
      },
    );
    return { data };
  },
  inputs: getStreamInputs,
});

export default { getStream };
