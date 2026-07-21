import { action, util } from "@prismatic-io/spectral";
import { searchWorkbooksExamplePayload } from "../../examplePayloads";
import { searchWorkbooksInputs } from "../../inputs";
import { getTableauClient } from "../../util";
export const searchWorkbooks = action({
  display: {
    label: "Search Workbooks",
    description: "Search for a specific workbook by a string of text.",
  },
  examplePayload: searchWorkbooksExamplePayload,
  perform: async (context, params) => {
    const client = await getTableauClient({
      tableauConnection: params.tableauConnection,
      timeout: util.types.toInt(params.timeout),
      debug: context.debug.enabled,
    });
    const searchString = util.types.toString(params.searchString);
    const searchField = util.types.toString(params.searchField);
    const filterOperator = util.types.toString(params.filterOperator);
    const response = await client.get(
      `/workbooks?filter=${searchField}:${filterOperator}:${filterOperator !== "in" ? searchString : `[${searchString}]`}`,
      {
        params: {
          pageSize:
            util.types.toNumber(params.pagination?.pageSize) || undefined,
          pageNumber:
            util.types.toNumber(params.pagination?.pageNumber) || undefined,
        },
      },
    );
    return {
      data: response.data,
    };
  },
  inputs: searchWorkbooksInputs,
});
