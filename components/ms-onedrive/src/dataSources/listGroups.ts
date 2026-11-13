import { dataSource, type Element } from "@prismatic-io/spectral";
import { getOneDriveClient } from "../client";
import { listGroupsDataSourceExamplePayload } from "../examplePayloads";
import { listGroupsDataSourceInputs } from "../inputs";
import { fetchAllPages } from "../util";

export const listGroups = dataSource({
  display: {
    label: "List Groups from Source",
    description: "Lists available groups for an account.",
  },
  inputs: listGroupsDataSourceInputs,
  perform: async (_context, { connection }) => {
    const client = getOneDriveClient(connection, false);
    const groups = await fetchAllPages<Record<string, unknown>>(
      client,
      "/groups",
    );

    return {
      result: groups.map((record) => {
        return {
          label: record.displayName,
          key: record.id,
        };
      }) as Element[],
    };
  },
  examplePayload: listGroupsDataSourceExamplePayload,
  dataSourceType: "picklist",
});
