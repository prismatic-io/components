import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getProjectExamplePayload as updateProjectExamplePayload } from "../../examplePayloads";
import { updateProjectInputs } from "../../inputs";
export const updateProject = action({
  display: {
    label: "Update Project",
    description: "Update a project",
  },
  inputs: updateProjectInputs,
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
  examplePayload: updateProjectExamplePayload,
});
