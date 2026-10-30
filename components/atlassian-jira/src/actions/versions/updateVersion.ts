import { action, outputSchema } from "@prismatic-io/spectral";
import { createV3Client } from "../../client";
import { updateVersionExamplePayload } from "../../examplePayloads";
import { updateVersionInputs } from "../../inputs";
import { updateVersionOutputSchema } from "../../outputSchemas";

export const updateVersion = action({
  display: {
    label: "Update Version",
    description: "Update an existing version by ID.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = await createV3Client(
      params.jiraConnection,
      context.debug.enabled,
    );
    const { data } = await client.put(`/version/${params.versionId}`, {
      description: params.description,
      name: params.versionName,
      archived: params.releaseDetails.archived,
      released: params.releaseDetails.released,
      startDate: params.releaseDetails.startDate,
      releaseDate: params.releaseDetails.releaseDate,
      project: params.projectKey,
      projectId: params.projectId,
      ...params.dynamicValues,
      ...params.fieldValues,
    });
    return { data };
  },
  examplePerform: async () => updateVersionExamplePayload,
  inputs: updateVersionInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateVersionOutputSchema,
  }),
  examplePayload: updateVersionExamplePayload,
});
