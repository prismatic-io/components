import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { defaultInputs } from "../../inputs/general";
import { getPingExamplePayload } from "../../examplePayloads/pings";

export const getPing = action({
  display: {
    label: "Get Ping",
    description: "Returns if the current token is valid.",
  },
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);

    const { data } = await client.get(`/ping`);

    return {
      data,
    };
  },
  inputs: defaultInputs,
  examplePayload: getPingExamplePayload,
});
