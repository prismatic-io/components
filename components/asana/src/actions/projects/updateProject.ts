import { action, outputSchema } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { updateProjectExamplePayload } from "../../examplePayloads";
import { updateProjectInputs } from "../../inputs";
import { projectResponseSchema } from "../../outputSchemas";
export const updateProject = action({
  display: {
    label: "Update Project",
    description: "Update the information and metadata of a project.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = await createAsanaClient(
      params.asanaConnection,
      context.debug.enabled,
    );
    const projectData = {
      data: {
        archived: params.projectSettings.archived,
        color: params.projectSettings.projectColor,
        default_view: params.projectSettings.defaultView,
        due_on: params.dueOn,
        followers: params.followers,
        name: params.name,
        notes: params.notes,
        owner: params.owner,
        start_on: params.startOn,
        team: params.team,
        html_notes: params.htmlNotes,
        privacy_setting: params.projectSettings.privacySetting,
      },
    };
    const { data } = await client.put(
      `/projects/${params.projectId}`,
      projectData,
    );
    return { data };
  },
  inputs: updateProjectInputs,
  examplePayload: updateProjectExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: projectResponseSchema,
  }),
});
