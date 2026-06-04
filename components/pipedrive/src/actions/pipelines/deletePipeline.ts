import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, pipelineIdInput } from "../../inputs";
import { WebhookVersion } from "../../constants";

export const deletePipeline = action({
  display: {
    label: "Delete Pipeline",
    description: "Deletes a pipeline.",
  },
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled, WebhookVersion.V2);
    const { data } = await client.delete(`/pipelines/${id}`);
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: pipelineIdInput,
  },
});
