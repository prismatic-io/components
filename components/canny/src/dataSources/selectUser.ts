import { dataSource } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectUserExamplePayload } from "../examplePayloads";
import { selectUserInputs } from "../inputs";
import type { User } from "../types";
import { paginateCursor, toSortedPicklist } from "../util";

export const selectUser = dataSource({
  display: {
    label: "Select User",
    description: "Selects a user from the Canny account.",
  },
  dataSourceType: "picklist",
  inputs: selectUserInputs,
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false);
    const data = await paginateCursor<"users", User>(
      client.postV2,
      "/users/list",
      "users",
      {},
      true,
    );
    const result = toSortedPicklist(
      data.users,
      (u) => `${u.name} (${u.email})`,
      (u) => u.id,
    );
    return { result };
  },
  examplePayload: selectUserExamplePayload,
});
