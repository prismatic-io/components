import { action, util } from "@prismatic-io/spectral";
import { searchConnectionsExamplePayload } from "../../examplePayloads";
import { searchConnectionsInputs } from "../../inputs";
import { listConnections } from "./listConnections";
export const searchConnections = action({
  display: {
    label: "Search Connections",
    description: "Search for a specific connection in a workbook.",
  },
  examplePayload: searchConnectionsExamplePayload,
  perform: async (context, params) => {
    const search = util.types.toString(params.searchString);
    const field = util.types.toString(params.searchField);
    const projectsResult = await listConnections.perform(context, {
      tableauConnection: params.tableauConnection,
      workbookId: params.workbookId,
      pagination: params.pagination,
      timeout: params.timeout || undefined,
    });
    const filteredResponse = projectsResult.data.connections.connection.filter(
      (connection: Record<string, unknown>) => {
        return (
          connection.datasource?.[field] &&
          connection.datasource[field] === search
        );
      },
    );
    if (filteredResponse.length < 1) {
      throw new Error(`Unable to find Connections matching: ${search}`);
    }
    return {
      data: filteredResponse,
    };
  },
  inputs: searchConnectionsInputs,
});
