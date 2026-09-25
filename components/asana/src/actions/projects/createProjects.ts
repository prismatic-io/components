import { action, outputSchema } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { createProjectsExamplePayload } from "../../examplePayloads";
import { createProjectsInputs } from "../../inputs";
import { projectResponseSchema } from "../../outputSchemas";
export const createProjects = action({
  display: {
    label: "Create Project",
    description:
      "Create a new project inside an existing team or organization.",
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
        default_view: params.defaultView,
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
    const endpoint = params.workspaceId
      ? `workspaces/${params.workspaceId}/projects`
      : "/projects";
    const { data } = await client.post(endpoint, projectData, {
      params: {
        opt_fields: params.optFields,
      },
    });
    return { data };
  },
  inputs: createProjectsInputs,
  examplePayload: createProjectsExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: projectResponseSchema,
  }),
});
