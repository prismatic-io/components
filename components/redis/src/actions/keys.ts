import { action } from "@prismatic-io/spectral";
import { connectionInput, key } from "../inputs";
import { createClient } from "../client";
import closeConnection from "../closeConnection";
import { keysExamplePayload } from "../examplePayloads";

export const keys = action({
  display: {
    label: "Keys",
    description: "Returns all keys matching a specified pattern",
  },
  perform: async (context, { key, redisConnection }) => {
    const client = await createClient(
      { redisConnection },
      context.debug.enabled,
    );
    const data = await client.keys(key);

    await closeConnection(client);

    return {
      data,
    };
  },
  inputs: { key, redisConnection: connectionInput },
  examplePayload: {
    data: keysExamplePayload,
  },
});
export default keys;
