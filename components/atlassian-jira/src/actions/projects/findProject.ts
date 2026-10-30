import { action, outputSchema, util } from "@prismatic-io/spectral";
import { createV3Client } from "../../client";
import { findProjectExamplePayload } from "../../examplePayloads";
import { findProjectInputs } from "../../inputs";
import { findProjectOutputSchema } from "../../outputSchemas";

export const findProject = action({
  display: {
    label: "Find Project",
    description: "Find a project by attribute.",
  },
  inputs: findProjectInputs,
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
        query: params.searchValue,
      },
    });
    const field = params.searchType === "key" ? "key" : "name";
    const matches = (values as Array<{ key?: string; name?: string }>).filter(
      (project) =>
        util.types
          .toString(project[field])
          .toLowerCase()
          .includes(params.searchValue),
    );

    return {
      data: matches,
    };
  },
  examplePerform: async () => findProjectExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: findProjectOutputSchema,
  }),
  examplePayload: findProjectExamplePayload,
});
