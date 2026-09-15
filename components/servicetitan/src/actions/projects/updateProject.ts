import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updateProjectExamplePayload } from "../../examplePayloads";
import { updateProjectInputs } from "../../inputs";
import { updateProjectOutputSchema } from "../../outputSchemas";
export const updateProject = action({
  display: {
    label: "Update Project",
    description: "Update a project.",
  },
  inputs: updateProjectInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateProjectOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      actualCompletionDate,
      customFields,
      externalData,
      name,
      projectManagerIds,
      startDate,
      statusId,
      subStatusId,
      summary,
      targetCompletionDate,
      jobsIds,
      projectId,
    },
  ) => {
    const client = createClient(connection, "jpm", context.debug.enabled);
    const { data } = await client.patch(`/projects/${projectId}`, {
      actualCompletionDate,
      customFields,
      externalData,
      name,
      projectManagerIds,
      startDate,
      statusId,
      subStatusId,
      summary,
      targetCompletionDate,
      jobsIds,
    });
    return {
      data,
    };
  },
  examplePerform: async () => updateProjectExamplePayload,
  examplePayload: updateProjectExamplePayload,
});
