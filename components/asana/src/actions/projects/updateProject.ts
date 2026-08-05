import { action } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { updateProjectExamplePayload } from "../../examplePayloads";
import { updateProjectInputs } from "../../inputs";
export const updateProject = action({
  display: {
    label: "Update Project",
    description: "Update the information and metadata of a project.",
  },
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
        followers: params.followers || undefined,
        name: params.name,
        notes: params.notes,
        owner: params.owner || undefined,
        start_on: params.startOn,
        team: params.team || undefined,
        html_notes: params.htmlNotes || undefined,
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
});
