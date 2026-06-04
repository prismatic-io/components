import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { activityIdInput, connectionInput } from "../../inputs";
import { WebhookVersion } from "../../constants";

export const getActivity = action({
  display: {
    label: "Get Activity",
    description: "Gets details of an activity.",
  },
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled, WebhookVersion.V2);
    const { data } = await client.get(`/activities/${id}`);
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: activityIdInput,
  },
});
