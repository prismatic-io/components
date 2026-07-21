import { action, util } from "@prismatic-io/spectral";
import { deleteProjectsExamplePayload } from "../../examplePayloads";
import { deleteProjectsInputs } from "../../inputs";
import { getTableauClient } from "../../util";
export const deleteProjects = action({
  display: {
    label: "Delete Project",
    description: "Delete an existing project by ID.",
  },
  examplePayload: deleteProjectsExamplePayload,
  perform: async (context, params) => {
    const client = await getTableauClient({
      tableauConnection: params.tableauConnection,
      timeout: util.types.toInt(params.timeout),
      debug: context.debug.enabled,
    });
    const response = await client.delete(`/projects/${params.projectId}`);
    return {
      data: response.data,
    };
  },
  inputs: deleteProjectsInputs,
});
