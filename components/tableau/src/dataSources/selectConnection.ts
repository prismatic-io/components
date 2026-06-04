import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { getTableuClient } from "../auth";
import { connectionInput, workbookId } from "../inputs";

export const selectConnection = dataSource({
  display: {
    label: "Select Connection",
    description: "Select a connection from a workbook in your Tableau site.",
  },
  inputs: {
    tableauConnection: connectionInput,
    workbookId: {
      ...workbookId,
      dataSource: undefined,
    },
  },
  perform: async (_context, { tableauConnection, workbookId }) => {
    const client = await getTableuClient({
      tableauConnection,
      timeout: 10000,
      debug: false,
    });

    const { data } = await client.get(
      `/workbooks/${util.types.toString(workbookId)}/connections/`,
      {
        params: { pageSize: 1000 },
      },
    );

    const connections = data?.connections?.connection ?? [];

    const result: Element[] = (connections as { id: string; type: string }[])
      .map((connection) => ({
        label: connection.type,
        key: connection.id.toString(),
      }))
      .sort((a, b) => (a.label < b.label ? -1 : 1));

    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      {
        label: "sqlserver",
        key: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      },
    ],
  },
});
