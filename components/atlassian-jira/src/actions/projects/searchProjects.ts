import { action, outputSchema } from "@prismatic-io/spectral";
import { createV3Client } from "../../client";
import { searchProjectsExamplePayload } from "../../examplePayloads";
import { searchProjectsInputs } from "../../inputs";
import { searchProjectsOutputSchema } from "../../outputSchemas";

export const searchProjects = action({
  display: {
    label: "Search Projects",
    description:
      "Return a list of projects that match the given string of text.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = await createV3Client(
      params.jiraConnection,
      context.debug.enabled,
    );
    const {
      data: { values },
    } = await client.get("/project/search", {
      params: {
        query: params.searchString,
      },
    });
    return { data: values };
  },
  examplePerform: async () => searchProjectsExamplePayload,
  inputs: searchProjectsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: searchProjectsOutputSchema,
  }),
  examplePayload: searchProjectsExamplePayload,
});
