import { dataSource, Element } from "@prismatic-io/spectral";
import { connection } from "../inputs";
import { createClient } from "../client";
import { TResponse } from "../interfaces/TResponse";
import { Group } from "../interfaces/Group";
import { paginateResults } from "../utils";

export const selectWorkspace = dataSource({
  display: {
    label: "Select Workspace",
    description: "Select a workspace from your Power BI account",
  },
  inputs: {
    connection,
  },
  perform: async (context, params) => {
    const client = createClient({ connection: params.connection }, false);
    const parameters = {
      $top: 100,
    };
    const { value: groups } = await paginateResults<Group>(client, "/groups", true, parameters);

    return {
      result: groups
        .sort((a, b) => (a.name < b.name ? -1 : 1))
        .map(({ id: key, name: label }): Element => ({ key, label })),
    };
  },
  dataSourceType: "picklist",
});

export default selectWorkspace;
