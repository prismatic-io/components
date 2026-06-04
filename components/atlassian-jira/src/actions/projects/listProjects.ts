import { action } from "@prismatic-io/spectral";
import { createV3Client } from "../../connections/auth";
import { listProjectsExamplePayload } from "../../examplePayloads";
import { connectionInput, maxResults, startAt } from "../../inputs";

export const listProjects = action({
  display: {
    label: "List Projects",
    description: "Retrieve a list of all projects.",
  },
  perform: async (context, params) => {
    const client = await createV3Client(params.jiraConnection, context.debug.enabled);
    const {
      data: { values },
    } = await client.get("/project/search", {
      params: {
        maxResults: params.maxResults || 10000,
        startAt: params.startAt || 0,
      },
    });
    return { data: values };
  },
  inputs: { jiraConnection: connectionInput, maxResults, startAt },
  examplePayload: listProjectsExamplePayload,
});
