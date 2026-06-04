import { action } from "@prismatic-io/spectral";
import { getDomoClient } from "../../client";
import { updateStreamInputs } from "../../inputs";
import { updateStreamExamplePayload } from "../../examplePayloads";

export const updateStream = action({
  display: {
    label: "Update Stream",
    description: "Updates the specified stream's metadata.",
  },
  examplePayload: updateStreamExamplePayload,
  perform: async (
    context,
    { connection, streamId, updateMethodString, updateMethodBody },
  ) => {
    const client = await getDomoClient(connection, context.debug.enabled);
    let body = {};
    if (updateMethodBody.length) body = JSON.parse(updateMethodBody);
    const { data } = await client.patch(`/streams/${streamId}`, body, {
      params: { updateMethod: updateMethodString },
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return { data };
  },
  inputs: updateStreamInputs,
});

export default { updateStream };
