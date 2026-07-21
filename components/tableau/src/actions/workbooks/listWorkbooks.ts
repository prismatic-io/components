import { action, util } from "@prismatic-io/spectral";
import { listWorkbooksExamplePayload } from "../../examplePayloads";
import { listWorkbooksInputs } from "../../inputs";
import { getTableauClient } from "../../util";
export const listWorkbooks = action({
  display: {
    label: "List Workbooks",
    description: "Retrieve a list of workbooks from a Tableau site.",
  },
  examplePayload: listWorkbooksExamplePayload,
  perform: async (context, params) => {
    const client = await getTableauClient({
      tableauConnection: params.tableauConnection,
      timeout: util.types.toInt(params.timeout),
      debug: context.debug.enabled,
    });
    const response = await client.get("/workbooks", {
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
  inputs: listWorkbooksInputs,
});
