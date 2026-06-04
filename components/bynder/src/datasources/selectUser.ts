import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connection } from "../inputs";
import type { Records } from "../types";
import { sortArray } from "../util";

export const selectUser = dataSource({
  display: {
    label: "Select User",
    description: "Select a user from the list of users available in Bynder.",
  },
  inputs: {
    connection,
  },
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false);
    const { data } = await client.get("/users");

    if (Array.isArray(data)) {
      const objects = sortArray<Records>(data, "name").map<Element>((user) => ({
        key: user.id.toString(),
        label: `${user.name} (ID: ${user.id})`,
      }));

      return { result: objects };
    }
    return { result: [] };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      {
        key: "A1B2C3D4-E5F6-7890-A1B2-C3D4E5F67890",
        label: "David (ID: A1B2C3D4-E5F6-7890-A1B2-C3D4E5F67890)",
      },
    ],
  },
});
