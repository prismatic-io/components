import { action } from "@prismatic-io/spectral";
import { createV3Client } from "../../connections/auth";
import { searchProjectsExamplePayload } from "../../examplePayloads";
import { connectionInput, searchString } from "../../inputs";

export const searchProjects = action({
  display: {
    label: "Search Projects",
    description: "Return a list of projects that match the given string of text.",
  },
  perform: async (context, params) => {
    const client = await createV3Client(params.jiraConnection, context.debug.enabled);
    const {
      data: { values },
    } = await client.get("/project/search", {
      params: {
        query: params.searchString,
      },
    });
    return { data: values };
  },
  inputs: { jiraConnection: connectionInput, searchString },
  examplePayload: searchProjectsExamplePayload,
});
