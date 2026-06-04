import { action } from "@prismatic-io/spectral";
import { key, value, connectionInput } from "../inputs";
import { createClient } from "../client";
import closeConnection from "../closeConnection";
import { setExamplePayload } from "../examplePayloads";

export const set = action({
  display: {
    label: "Set",
    description: "Set the value of a key",
  },
  perform: async (context, { key, value, redisConnection }) => {
    const client = await createClient(
      { redisConnection },
      context.debug.enabled,
    );
    const data = await client.set(key, value);

    await closeConnection(client);

    return {
      data,
    };
  },
  inputs: { key, value, redisConnection: connectionInput },
  examplePayload: {
    data: setExamplePayload,
  },
});

export default set;
