import { action, outputSchema, util } from "@prismatic-io/spectral";
import { createV3Client } from "../../client";
import { createVersionExamplePayload } from "../../examplePayloads";
import { createVersionInputs } from "../../inputs";
import { createVersionOutputSchema } from "../../outputSchemas";

export const createVersion = action({
  display: {
    label: "Create Version",
    description: "Create a new version.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = await createV3Client(
      params.jiraConnection,
      context.debug.enabled,
    );
    const { data } = await client.post("/version", {
      description: params.description,
      name: params.versionName,
      archived: params.releaseDetails.archived,
      released: params.releaseDetails.released,
      startDate: params.releaseDetails.startDate,
      releaseDate: params.releaseDetails.releaseDate,
      project: params.projectKey,
      projectId: util.types.toInt(params.projectId),
      ...params.dynamicValues,
      ...params.fieldValues,
    });

    return {
      data,
    };
  },
  examplePerform: async () => createVersionExamplePayload,
  inputs: createVersionInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createVersionOutputSchema,
  }),
  examplePayload: createVersionExamplePayload,
});
