import { action, util } from "@prismatic-io/spectral";
import { createProjectExamplePayload } from "../../examplePayloads";
import { createProjectInputs } from "../../inputs";
import { getTableauClient } from "../../util";
export const createProject = action({
  display: {
    label: "Create Project",
    description: "Create a new project in a Tableau site.",
  },
  examplePayload: createProjectExamplePayload,
  perform: async (context, params) => {
    const client = await getTableauClient({
      tableauConnection: params.tableauConnection,
      timeout: util.types.toInt(params.timeout),
      debug: context.debug.enabled,
    });
    const response = await client.post("/projects", {
      project: {
        parentProjectId: params.parentProjectId || undefined,
        name: params.projectName,
        description: params.description || undefined,
        contentPermissions: params.contentPermissions || undefined,
      },
    });
    return {
      data: response.data,
    };
  },
  inputs: createProjectInputs,
});
