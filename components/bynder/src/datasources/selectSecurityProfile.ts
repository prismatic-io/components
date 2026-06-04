import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connection } from "../inputs";
import type { Records } from "../types";
import { sortArray } from "../util";

export const selectSecurityProfile = dataSource({
  display: {
    label: "Select Security Profile",
    description:
      "Select a security profile from the list of profiles available in Bynder.",
  },
  inputs: {
    connection,
  },
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false);
    const { data } = await client.get("/profiles");

    if (Array.isArray(data)) {
      const objects = sortArray<Records>(data, "name").map<Element>(
        (profile) => ({
          key: profile.id.toString(),
          label: `${profile.name} (ID: ${profile.id})`,
        }),
      );

      return { result: objects };
    }
    return { result: [] };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      {
        label: "Internal Limited user (ID: 123)",
        key: "123",
      },
    ],
  },
});
