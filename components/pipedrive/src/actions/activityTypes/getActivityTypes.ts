import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput } from "../../inputs";

export const getActivityTypes = action({
  display: {
    label: "Get Activity Types",
    description: "Gets all activity types.",
  },
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get("/activityTypes");
    return { data };
  },
  inputs: { connection: connectionInput },
});
