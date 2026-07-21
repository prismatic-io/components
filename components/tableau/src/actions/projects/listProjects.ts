import { action, util } from "@prismatic-io/spectral";
import { listProjectsExamplePayload } from "../../examplePayloads";
import { listProjectsInputs } from "../../inputs";
import { getTableauClient } from "../../util";
export const listProjects = action({
  display: {
    label: "List Projects",
    description: "Retrieve a list of projects from a Tableau site.",
  },
  examplePayload: listProjectsExamplePayload,
  perform: async (context, params) => {
    const client = await getTableauClient({
      tableauConnection: params.tableauConnection,
      timeout: util.types.toInt(params.timeout),
      debug: context.debug.enabled,
    });
    const response = await client.get("/projects", {
      params: {
        pageSize: util.types.toNumber(params.pagination?.pageSize) || undefined,
        pageNumber:
          util.types.toNumber(params.pagination?.pageNumber) || undefined,
      },
    });
    return {
      data: response.data,
    };
  },
  inputs: listProjectsInputs,
});
