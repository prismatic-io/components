import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getZendeskClient } from "../../client";
import { getStagesStreamExamplePayload } from "../../examplePayloads";
import { getStagesStreamInputs } from "../../inputs";

export const getStagesStream = action({
  display: {
    label: "Get Stages Stream",
    description: "Reads the stream of stage events.",
  },
  perform: async (context, { connection, position, limit }) => {
    try {
      const client = getZendeskClient(connection, context.debug.enabled, true);
      const params = { position, ...(limit && { limit }) };
      const { data } = await client.get(`/stages/stream`, {
        params,
        headers: { Accept: "application/json" },
      });

      return { data };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
  inputs: getStagesStreamInputs,
  examplePayload: getStagesStreamExamplePayload,
});
export default { getStagesStream };
