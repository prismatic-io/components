import { dataSource, Element, util } from "@prismatic-io/spectral";
import { connection, datasetId } from "../inputs";
import { createClient } from "../client";
import { TResponse } from "../interfaces/TResponse";
import { Table } from "../interfaces/Table";
import { paginateResults } from "../utils";

export const selectTable = dataSource({
  display: {
    label: "Select Table",
    description: "Select a table from a dataset",
  },
  inputs: {
    connection,
    datasetId: {
      ...datasetId,
      dataSource: undefined,
    },
  },
  dataSourceType: "picklist",
  perform: async (context, params) => {
    const client = createClient({ connection: params.connection }, false);
    const parameters = {
      $top: 100,
    };
    const { value: tables } = await paginateResults<Table>(
      client,
      `/datasets/${params.datasetId}/tables`,
      true,
      parameters
    );

    return {
      result: tables
        .sort((a, b) => (a.name < b.name ? -1 : 1))
        .map(
          ({ id: key, name: label }): Element => ({
            key: label,
            label,
          })
        ),
    };
  },
});
