import type { Group } from "@microsoft/microsoft-graph-types";
import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectGroupExamplePayload } from "../examplePayloads";
import { DIRECTORY_PAGE_SIZE, PLANNER_ENDPOINTS } from "../constants";
import { fetchAllDirectory, isClientCredentials } from "../utils";
import { selectGroupInputs } from "../inputs";
export const selectGroup = dataSource({
  display: {
    label: "Select Group",
    description: "Select a Microsoft 365 group that can contain plans.",
  },
  inputs: selectGroupInputs,
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false);
    const { value } = isClientCredentials(connection)
      ? await fetchAllDirectory<Group>(client, PLANNER_ENDPOINTS.GROUPS, {
          $filter: "groupTypes/any(c:c eq 'Unified')",
          $select: "id,displayName",
          $top: DIRECTORY_PAGE_SIZE,
        })
      : await fetchAllDirectory<Group>(
          client,
          PLANNER_ENDPOINTS.MEMBER_OF_GROUPS,
          {
            $select: "id,displayName",
            $top: DIRECTORY_PAGE_SIZE,
          },
        );
    const result = value.map<Element>((group) => ({
      label: util.types.toString(group.displayName),
      key: util.types.toString(group.id),
    }));
    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: selectGroupExamplePayload,
});
