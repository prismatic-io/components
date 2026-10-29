import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { createGitlabClient } from "../client";
import { selectGroupExamplePayload } from "../examplePayloads";
import { selectGroupInputs } from "../inputs";
import type { Group } from "../types";
import { fetchAllPages } from "../utils";

export const selectGroup = dataSource({
  display: {
    label: "Select Group",
    description: "Select a group visible to the connection's user.",
  },
  inputs: selectGroupInputs,
  perform: async (_context, { connection }) => {
    const client = createGitlabClient(connection, false);
    const groups = await fetchAllPages<Group>(client, "/groups", {
      order_by: "path",
      sort: "asc",
    });
    const result: Element[] = groups.map((item) => ({
      label: item.full_path,
      key: util.types.toString(item.id),
    }));
    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: selectGroupExamplePayload,
});
