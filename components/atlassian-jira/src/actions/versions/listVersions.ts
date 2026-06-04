import { action } from "@prismatic-io/spectral";
import { createV3Client } from "../../connections/auth";
import { listVersionsExamplePayload } from "../../examplePayloads";
import { connectionInput, maxResults, projectId, startAt } from "../../inputs";

export const listVersions = action({
  display: {
    label: "List Versions",
    description: "Return a list of all versions for a project.",
  },
  perform: async (context, params) => {
    const client = await createV3Client(params.jiraConnection, context.debug.enabled);
    const { data } = await client.get(`/project/${params.projectId}/version`, {
      params: {
        maxResults: params.maxResults || undefined,
        startAt: params.startAt || undefined,
      },
    });
    return { data };
  },
  inputs: {
    jiraConnection: connectionInput,
    projectId,
    maxResults,
    startAt,
  },
  examplePayload: listVersionsExamplePayload,
});
