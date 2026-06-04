import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, projectId } from "../../inputs";

export const getServiceAccount = action({
  display: {
    description:
      "Receives the service account for a project used for interactions with Google Cloud KMS",
    label: "Get Service Account",
  },
  inputs: {
    connectionInput,
    projectId,
  },
  perform: async (_context, { connectionInput, projectId }) => {
    const client = createClient(connectionInput);
    const { data } = await client.projects.getServiceAccount({
      projectId: projectId || undefined,
    });
    return {
      data,
    };
  },
});
