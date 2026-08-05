import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getProjectExamplePayload as createProjectExamplePayload } from "../../examplePayloads";
import { createProjectInputs } from "../../inputs";
export const createProject = action({
  display: {
    label: "Create Project",
    description: "Create a new project",
  },
  inputs: createProjectInputs,
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
  examplePayload: createProjectExamplePayload,
});
