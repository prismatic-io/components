import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectGroupExamplePayload } from "../examplePayloads/dataSources";
import { connection } from "../inputs/general";
import type { Group } from "../interfaces/group";
import { paginateRecordsWithLink } from "../util/util";

export const selectGroup = dataSource({
  display: {
    label: "Select Group",
    description: "A picklist of groups in your Okta Org.",
  },
  inputs: {
    connection,
  },
  perform: async (_context, { connection }) => {
    const client = await createClient(connection, false);
    const data = await paginateRecordsWithLink<Group>(client, "/groups", true, {});

    const result = data.map<Element>((group) => ({
      label: group.profile.name,
      key: group.id.toString(),
    }));

    return {
      result,
    };
  },
  examplePayload: selectGroupExamplePayload,
  dataSourceType: "picklist",
});
