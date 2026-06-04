import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, stageIdInput } from "../../inputs";
import { WebhookVersion } from "../../constants";

export const getStage = action({
  display: {
    label: "Get Stage",
    description: "Gets one stage.",
  },
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled, WebhookVersion.V2);
    const { data } = await client.get(`/stages/${id}`);
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: stageIdInput,
  },
});
