import { dataSource, type Element } from "@prismatic-io/spectral";
import { getGuruClient } from "../client";
import { selectUserGroupInputs } from "../inputs";
import type { GuruGroup } from "../types";

export const selectUserGroup = dataSource({
  dataSourceType: "picklist",
  display: {
    label: "Select User Group",
    description: "Select a user group from your Guru workspace.",
  },
  perform: async (_context, { connection }) => {
    const client = getGuruClient(connection, false);

    const { data: groups } = await client.get<GuruGroup[]>("/groups");

    return {
      result: groups
        .map(
          (group): Element => ({
            label: group.name,
            key: group.id.toString(),
          }),
        )
        .sort((a, b) => ((a.label ?? "") < (b.label ?? "") ? -1 : 1)),
    };
  },
  inputs: selectUserGroupInputs,
  examplePayload: {
    result: [
      { label: "All Members", key: "5f419b24-a3dc-4cc9-9f5a-d78fc1ffa43f" },
      { label: "Experts", key: "10101010-1010-1010-1010-101010101010" },
    ],
  },
});
