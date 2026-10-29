import { dataSource, type Element } from "@prismatic-io/spectral";
import { connectionInput, spreadsheetId, title } from "../inputs";
import { worksheetWithTitle } from "../util";
import { createClient } from "../client";
import { selectColumnResponse } from "../examplePayloads";

export const selectColumn = dataSource({
  display: {
    label: "Select Column",
    description: "Select a Column from a Worksheet",
  },
  inputs: {
    spreadsheetId: { ...spreadsheetId, dataSource: undefined },
    title: {
      ...title,
      dataSource: undefined,
    },
    connection: connectionInput,
  },
  dataSourceType: "picklist",
  perform: async (_context, { connection, spreadsheetId, title }) => {
    const client = await createClient(spreadsheetId, connection);

    const sheet = worksheetWithTitle(client, title);

    const options = { limit: 1, offset: 0 };
    await sheet.getRows(options);
    const headers = sheet.headerValues;

    const result = headers.map<Element>((headerName) => ({
      key: headerName,
      label: headerName,
    }));

    return {
      result,
    };
  },
  examplePayload: { result: selectColumnResponse },
});
