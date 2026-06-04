import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, stageIdInput } from "../../inputs";
import { WebhookVersion } from "../../constants";

export const deleteStage = action({
  display: {
    label: "Delete Stage",
    description: "Deletes a stage.",
  },
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled, WebhookVersion.V2);
    const { data } = await client.delete(`/stages/${id}`);
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: stageIdInput,
  },
});
