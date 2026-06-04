import { action } from "@prismatic-io/spectral";
import { createV3Client } from "../../connections/auth";
import { getProjectExamplePayload } from "../../examplePayloads";
import { connectionInput, projectId } from "../../inputs";

export const getProject = action({
  display: {
    label: "Get Project",
    description: "Get the information and metadata of a project.",
  },
  perform: async (context, params) => {
    const client = await createV3Client(params.jiraConnection, context.debug.enabled);
    const { data } = await client.get(`/project/${params.projectId}`);
    return { data };
  },
  inputs: {
    jiraConnection: connectionInput,
    projectId,
  },
  examplePayload: getProjectExamplePayload,
});
