import { dataSource, Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connection } from "../inputs";
import { TResponse } from "../interfaces/TResponse";
import { Dataset } from "../interfaces/Dataset";
import { paginateResults } from "../utils";

export const selectDataset = dataSource({
  display: {
    label: "Select Dataset",
    description: "Select a dataset from your Power BI workspace",
  },
  dataSourceType: "picklist",
  inputs: {
    connection,
  },
  perform: async (context, params) => {
    const client = createClient({ connection: params.connection }, false);
    const parameters = {
      $top: 100,
    };
    const { value: datasets } = await paginateResults<Dataset>(client, "/datasets", true, parameters);

    const result = datasets
      .sort((a, b) => (a.name < b.name ? -1 : 1))
      .map(
        ({ id: key, name: label }): Element => ({
          key,
          label,
        })
      );

    return {
      result,
    };
  },
});
