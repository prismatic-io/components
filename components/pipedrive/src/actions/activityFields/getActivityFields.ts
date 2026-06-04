import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput } from "../../inputs";

export const getActivityFields = action({
  display: {
    label: "Get Activity Fields",
    description: "Gets all activity fields.",
  },
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get("/activityFields");
    return { data };
  },
  inputs: { connection: connectionInput },
});
