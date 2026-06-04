import { action } from "@prismatic-io/spectral";
import { createV3Client } from "../../connections/auth";
import { listPrioritiesExamplePayload } from "../../examplePayloads";
import { connectionInput, maxResults, startAt } from "../../inputs";

export const listPriorities = action({
  display: {
    label: "List Priorities",
    description: "Return a list of all priorities.",
  },
  perform: async (context, params) => {
    const client = await createV3Client(params.jiraConnection, context.debug.enabled);
    const { data } = await client.get("/priority/search", {
      params: {
        maxResults: params.maxResults || 50,
        startAt: params.startAt || 0,
      },
    });
    return { data };
  },
  inputs: {
    jiraConnection: connectionInput,
    maxResults,
    startAt,
  },
  examplePayload: listPrioritiesExamplePayload,
});
