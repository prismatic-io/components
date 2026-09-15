import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createProjectExamplePayload } from "../../examplePayloads";
import { createProjectInputs } from "../../inputs";
import { createProjectOutputSchema } from "../../outputSchemas";
export const createProject = action({
  display: {
    label: "Create Project",
    description: "Create a new project.",
  },
  inputs: createProjectInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createProjectOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      actualCompletionDate,
      customFields,
      customerId,
      externalData,
      locationId,
      name,
      projectManagerIds,
      startDate,
      statusId,
      subStatusId,
      summary,
      targetCompletionDate,
    },
  ) => {
    const client = createClient(connection, "jpm", context.debug.enabled);
    const { data } = await client.post(`/projects`, {
      actualCompletionDate,
      customFields,
      customerId,
      externalData,
      locationId,
      name,
      projectManagerIds,
      startDate,
      statusId,
      subStatusId,
      summary,
      targetCompletionDate,
    });
    return {
      data,
    };
  },
  examplePerform: async () => createProjectExamplePayload,
  examplePayload: createProjectExamplePayload,
});
