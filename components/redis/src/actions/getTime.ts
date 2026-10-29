import { action } from "@prismatic-io/spectral";
import { connectionInput } from "../inputs";
import { createClient } from "../client";
import closeConnection from "../closeConnection";
import { getTimeExamplePayload } from "../examplePayloads";

export const getTime = action({
  display: {
    label: "Get Time",
    description: "Get the local time of the redis server",
  },
  perform: async (context, { redisConnection }) => {
    const client = await createClient(
      { redisConnection },
      context.debug.enabled,
    );
    const data = await client.time();

    await closeConnection(client);

    return {
      data,
    };
  },
  inputs: { redisConnection: connectionInput },
  examplePayload: {
    data: getTimeExamplePayload as unknown,
  },
});

export default getTime;
