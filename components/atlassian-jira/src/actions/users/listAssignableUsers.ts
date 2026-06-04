import { action } from "@prismatic-io/spectral";
import { createV3Client } from "../../connections/auth";
import { listAssignableUsersExamplePayload } from "../../examplePayloads";
import { connectionInput, maxResults, projectKey, startAt } from "../../inputs";

export const listAssignableUsers = action({
  display: {
    label: "List Assignable Users for Project",
    description: "Return a list of users assignable to the given project.",
  },
  perform: async (context, params) => {
    const client = await createV3Client(params.jiraConnection, context.debug.enabled);
    const { data } = await client.get("/user/assignable/search", {
      params: {
        project: params.projectKey,
        startAt: params.startAt || 0,
        maxResults: params.maxResults || 10000,
      },
    });
    return { data };
  },
  inputs: {
    jiraConnection: connectionInput,
    projectKey: { ...projectKey, required: true },
    startAt,
    maxResults,
  },
  examplePayload: listAssignableUsersExamplePayload,
});
