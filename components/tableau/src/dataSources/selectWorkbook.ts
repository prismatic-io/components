import { dataSource, type Element } from "@prismatic-io/spectral";
import { getTableuClient } from "../auth";
import { connectionInput } from "../inputs";

export const selectWorkbook = dataSource({
  display: {
    label: "Select Workbook",
    description: "A picklist of workbooks in your Tableau site.",
  },
  inputs: {
    tableauConnection: connectionInput,
  },
  perform: async (_context, { tableauConnection }) => {
    const client = await getTableuClient({
      tableauConnection,
      timeout: 10000,
      debug: false,
    });

    const { data } = await client.get("/workbooks", {
      params: { pageSize: 1000 },
    });

    const workbooks = data?.workbooks?.workbook ?? [];

    const result: Element[] = (workbooks as { name: string; id: string }[])
      .map((workbook) => ({
        label: workbook.name,
        key: workbook.id.toString(),
      }))
      .sort((a, b) => (a.label < b.label ? -1 : 1));

    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      {
        label: "Sales Dashboard",
        key: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      },
    ],
  },
});
