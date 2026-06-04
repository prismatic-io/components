import { action } from "@prismatic-io/spectral";
import { createV3Client } from "../../connections/auth";
import { getStatusListExamplePayload } from "../../examplePayloads";
import { connectionInput, maxResults, projectId, startAt } from "../../inputs";

export const getStatusList = action({
  display: {
    label: "Get Status List",
    description: "Return a list of statuses for a project.",
  },
  perform: async (context, params) => {
    const client = await createV3Client(params.jiraConnection, context.debug.enabled);
    const { data } = await client.get("/statuses/search", {
      params: {
        projectId: params.projectId,
        maxResults: params.maxResults || 50,
        startAt: params.startAt || 0,
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
  examplePayload: getStatusListExamplePayload,
});
