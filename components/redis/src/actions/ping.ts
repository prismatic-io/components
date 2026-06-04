import { action } from "@prismatic-io/spectral";
import { connectionInput } from "../inputs";
import { createClient } from "../client";
import closeConnection from "../closeConnection";
import { pingExamplePayload } from "../examplePayloads";

export const ping = action({
  display: {
    label: "Ping",
    description: "Send a ping to the redis server",
  },
  perform: async (context, { redisConnection }) => {
    const client = await createClient(
      { redisConnection },
      context.debug.enabled,
    );
    const data = await client.ping();

    await closeConnection(client);

    return {
      data,
    };
  },
  inputs: { redisConnection: connectionInput },
  examplePayload: {
    data: pingExamplePayload,
  },
});

export default ping;
