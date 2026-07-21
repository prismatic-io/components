import { action, util } from "@prismatic-io/spectral";
import { searchProjectsExamplePayload } from "../../examplePayloads";
import { searchProjectsInputs } from "../../inputs";
import { getTableauClient } from "../../util";
export const searchProjects = action({
  display: {
    label: "Search Projects",
    description: "Search for a specific project by a string of text.",
  },
  examplePayload: searchProjectsExamplePayload,
  perform: async (context, params) => {
    const searchString = util.types.toString(params.searchString);
    const searchField = util.types.toString(params.searchField);
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
        filter: `${searchField}:eq:${searchString}`,
      },
    });
    return {
      data: response.data,
    };
  },
  inputs: searchProjectsInputs,
});
