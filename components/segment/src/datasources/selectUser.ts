import { dataSource } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connectionInput, region } from "../inputs";

export const selectUser = dataSource({
  display: {
    label: "Select User",
    description: "A picklist of users with access to your Segment workspace.",
  },
  inputs: {
    connection: connectionInput,
    region,
  },
  perform: async (_context, { connection, region }) => {
    const client = createClient(connection, region, false);
    const { data } = await client.get("/users", {
      params: {
        pagination: {
          count: 200,
        },
      },
    });
    if (data.data?.users) {
      const result = data.data.users
        .map((user: { id: string; name: string; email: string }) => ({
          label: user.name ? `${user.name} (${user.email})` : user.email,
          key: user.id,
        }))
        .sort((a: { label: string }, b: { label: string }) =>
          a.label < b.label ? -1 : 1,
        );
      return { result };
    }
    return { result: [] };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      {
        label: "Sloth (sloth@segment.com)",
        key: "i2VTJURQprNfqdwjLFPWYx",
      },
    ],
  },
});
