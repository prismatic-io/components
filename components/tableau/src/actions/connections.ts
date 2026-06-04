import { action, util } from "@prismatic-io/spectral";
import { getTableuClient } from "../auth";
import {
  timeout,
  connectionId,
  connectionPassword,
  serverAddress,
  serverPort,
  workbookId,
  connectionUsername,
  embedPassword,
  queryTaggingEnabled,
  pageNumber,
  pageSize,
  connectionInput,
  searchString,
} from "../inputs";
import {
  listConnectionsExamplePayload,
  searchConnectionsExamplePayload,
  updateConnectionExamplePayload,
} from "../examplePayloads";

export const listConnections = action({
  display: {
    label: "List Connections",
    description:
      "Retrieve a list of connections connected to your Tableau site",
  },
  examplePayload: listConnectionsExamplePayload,
  perform: async (context, params) => {
    const client = await getTableuClient({
      tableauConnection: params.tableauConnection,
      timeout: util.types.toInt(params.timeout),
      debug: context.debug.enabled,
    });
    const response = await client.get(
      `/workbooks/${params.workbookId}/connections/`,
      {
        params: {
          pageSize: util.types.toNumber(params.pageSize) || undefined,
          pageNumber: util.types.toNumber(params.pageNumber) || undefined,
        },
      },
    );

    return {
      data: response.data,
    };
  },
  inputs: {
    workbookId,
    timeout,
    pageSize,
    pageNumber,
    tableauConnection: connectionInput,
  },
});

export const searchConnections = action({
  display: {
    label: "Search Connections",
    description: "Search for a specific Connection in a Workbook",
  },
  examplePayload: searchConnectionsExamplePayload,
  perform: async (context, params) => {
    const search = util.types.toString(params.searchString);
    const field = util.types.toString(params.searchField);
    const projectsResult = await listConnections.perform(context, {
      tableauConnection: params.tableauConnection,
      workbookId: params.workbookId,
      pageNumber: params.pageNumber || undefined,
      pageSize: params.pageSize || undefined,
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
  inputs: {
    workbookId,
    searchString,
    searchField: {
      label: "Search Field",
      type: "string",
      required: true,
    },
    timeout,
    tableauConnection: connectionInput,
    pageNumber,
    pageSize,
  },
});

export const updateConnection = action({
  display: {
    label: "Update Connection",
    description:
      "Update the information and metadata of an existing connection by Id",
  },
  examplePayload: updateConnectionExamplePayload,
  perform: async (context, params) => {
    const client = await getTableuClient({
      tableauConnection: params.tableauConnection,
      timeout: util.types.toInt(params.timeout),
      debug: context.debug.enabled,
    });
    const response = await client.put(
      `/workbooks/${params.workbookId}/connections/${params.connectionId}`,
      {
        connection: {
          serverAddress: params.serverAddress || undefined,
          serverPort: params.serverPort || undefined,
          userName: params.connectionUsername || undefined,
          password: params.connectionPassword || undefined,
          embedPassword: params.embedPassword || undefined,
          queryTaggingEnabled: params.queryTaggingEnabled || undefined,
        },
      },
    );
    return {
      data: response.data,
    };
  },

  inputs: {
    workbookId,
    connectionId,
    serverAddress,
    serverPort,
    connectionUsername,
    connectionPassword,
    embedPassword,
    queryTaggingEnabled,
    timeout,
    tableauConnection: connectionInput,
  },
});
