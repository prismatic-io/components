import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { ENDPOINTS } from "../constants";
import { selectUserExamplePayload } from "../examplePayloads";
import { selectUserInputs } from "../inputs";
import type { SelectableResource } from "../types";
import { compareElementsByLabel } from "../util";

export const selectUser = dataSource({
  display: {
    label: "Select User",
    description: "Select a user from the list of users in the directory.",
  },
  inputs: selectUserInputs,
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false);
    const {
      data: { value },
    } = await client.get(ENDPOINTS.USERS);

    const result = (value as SelectableResource[])
      .map<Element>((user) => ({
        label: user.displayName,
        key: user.id.toString(),
      }))
      .sort(compareElementsByLabel);

    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: selectUserExamplePayload,
});
