import { action, util } from "@prismatic-io/spectral";
import { listConnectionsExamplePayload } from "../../examplePayloads";
import { listConnectionsInputs } from "../../inputs";
import { getTableauClient } from "../../util";
export const listConnections = action({
  display: {
    label: "List Connections",
    description: "Retrieve a list of connections from a Tableau workbook.",
  },
  examplePayload: listConnectionsExamplePayload,
  perform: async (context, params) => {
    const client = await getTableauClient({
      tableauConnection: params.tableauConnection,
      timeout: util.types.toInt(params.timeout),
      debug: context.debug.enabled,
    });
    const response = await client.get(
      `/workbooks/${params.workbookId}/connections/`,
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
  inputs: listConnectionsInputs,
});
