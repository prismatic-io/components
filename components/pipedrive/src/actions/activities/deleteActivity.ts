import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { activityIdInput, connectionInput } from "../../inputs";
import { WebhookVersion } from "../../constants";

export const deleteActivity = action({
  display: {
    label: "Delete Activity",
    description: "Deletes an activity.",
  },
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled, WebhookVersion.V2);
    const { data } = await client.delete(`/activities/${id}`);
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: activityIdInput,
  },
});
