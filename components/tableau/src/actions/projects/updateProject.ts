import { action, util } from "@prismatic-io/spectral";
import { updateProjectExamplePayload } from "../../examplePayloads";
import { updateProjectInputs } from "../../inputs";
import { getTableauClient } from "../../util";
export const updateProject = action({
  display: {
    label: "Update Project",
    description:
      "Update the contents and metadata of an existing project by ID.",
  },
  examplePayload: updateProjectExamplePayload,
  perform: async (context, params) => {
    const client = await getTableauClient({
      tableauConnection: params.tableauConnection,
      timeout: util.types.toInt(params.timeout),
      debug: context.debug.enabled,
    });
    const response = await client.put(`/projects/${params.projectId}`, {
      project: {
        parentProjectId: params.parentProjectId || undefined,
        name: params.projectName || undefined,
        description: params.description || undefined,
        contentPermissions: params.contentPermissions || undefined,
      },
    });
    return {
      data: response.data,
    };
  },
  inputs: updateProjectInputs,
});
