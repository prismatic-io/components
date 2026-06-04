import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listChannelsExamplePayload } from "../../examplePayloads";
import { connectionInput, version } from "../../inputs";

export const listChannels = action({
  display: {
    label: "List Channels",
    description: "List user-authorized channels info",
  },
  perform: async (context, { connection, version }) => {
    const client = createClient(connection, version, context.debug.enabled);
    const { data } = await client.get(`/channel`);
    return { data };
  },
  inputs: {
    connection: connectionInput,
    version,
  },
  examplePayload: listChannelsExamplePayload,
});
