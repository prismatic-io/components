import { action } from "@prismatic-io/spectral";
import { key, connectionInput } from "../inputs";
import { createClient } from "../client";
import closeConnection from "../closeConnection";
import { deleteKeyExamplePayload } from "../examplePayloads";

export const deleteKey = action({
  display: {
    label: "Delete Key",
    description: "Delete the value of a key",
  },
  perform: async (context, { key, redisConnection }) => {
    const client = await createClient(
      { redisConnection },
      context.debug.enabled,
    );
    const data = await client.del(key);

    await closeConnection(client);

    return {
      data,
    };
  },
  inputs: { key, redisConnection: connectionInput },
  examplePayload: {
    data: deleteKeyExamplePayload,
  },
});
export default deleteKey;
