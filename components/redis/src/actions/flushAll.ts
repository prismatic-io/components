import { action } from "@prismatic-io/spectral";
import { connectionInput } from "../inputs";
import { createClient } from "../client";
import closeConnection from "../closeConnection";
import { flushAllExamplePayload } from "../examplePayloads";

export const flushAll = action({
  display: {
    label: "Flush All",
    description:
      "Delete all the keys of all the existing databases, not just the currently selected one",
  },
  perform: async (context, { redisConnection }) => {
    const client = await createClient(
      { redisConnection },
      context.debug.enabled,
    );
    const data = await client.flushAll();

    await closeConnection(client);

    return {
      data,
    };
  },
  inputs: { redisConnection: connectionInput },
  examplePayload: {
    data: flushAllExamplePayload,
  },
});
export default flushAll;
