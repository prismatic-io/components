import { action } from "@prismatic-io/spectral";
import { connectionInput, key } from "../inputs";
import { createClient } from "../client";
import closeConnection from "../closeConnection";
import { getExamplePayload } from "../examplePayloads";

export const get = action({
  display: {
    label: "Get",
    description: "Get the value of a key",
  },
  perform: async (context, { key, redisConnection }) => {
    const client = await createClient(
      { redisConnection },
      context.debug.enabled,
    );
    const data = await client.get(key);

    await closeConnection(client);

    return {
      data,
    };
  },
  inputs: { redisConnection: connectionInput, key },
  examplePayload: {
    data: getExamplePayload,
  },
});

export default get;
