import { action, util } from "@prismatic-io/spectral";
import { getProjectExamplePayload } from "../../examplePayloads";
import { getProjectInputs } from "../../inputs";
import { getTableauClient } from "../../util";
export const getProject = action({
  display: {
    label: "Get Project",
    description: "Retrieve an existing project by ID.",
  },
  examplePayload: getProjectExamplePayload,
  perform: async (context, params) => {
    const client = await getTableauClient({
      tableauConnection: params.tableauConnection,
      timeout: util.types.toInt(params.timeout),
      debug: context.debug.enabled,
    });
    const response = await client.get("/projects", {
      params: {
        filter: `name:eq:${params.projectName}`,
      },
    });
    return {
      data: response.data,
    };
  },
  inputs: getProjectInputs,
});
