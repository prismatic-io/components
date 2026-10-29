import type { User } from "@microsoft/microsoft-graph-types";
import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectUserExamplePayload } from "../examplePayloads";
import { DIRECTORY_PAGE_SIZE, PLANNER_ENDPOINTS } from "../constants";
import { fetchAllDirectory } from "../utils";
import { selectUserInputs } from "../inputs";
export const selectUser = dataSource({
  display: {
    label: "Select User",
    description: "Select a user to assign work to.",
  },
  inputs: selectUserInputs,
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false);
    const { value } = await fetchAllDirectory<User>(
      client,
      PLANNER_ENDPOINTS.USERS,
      {
        $select: "id,displayName,mail",
        $top: DIRECTORY_PAGE_SIZE,
      },
    );
    const result = value.map<Element>((user) => ({
      label: util.types.toString(user.displayName || user.mail),
      key: util.types.toString(user.id),
    }));
    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: selectUserExamplePayload,
});
