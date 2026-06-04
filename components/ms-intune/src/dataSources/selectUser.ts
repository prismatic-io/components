import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connection } from "../inputs/general";

export const selectUser = dataSource({
  display: {
    label: "Select User",
    description: "Select a user from the list of users in your directory.",
  },
  inputs: {
    connection,
  },
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false);
    const {
      data: { value },
    } = await client.get("/users");

    const result = (value as { id: string; displayName: string }[])
      .map<Element>((user) => ({
        label: user.displayName,
        key: user.id.toString(),
      }))
      .sort((a, b) => ((a.label ?? "") < (b.label ?? "") ? -1 : 1));

    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      {
        label: "Conf Room Adams",
        key: "6ea91a8d-e32e-41a1-b7bd-d2d185eed0e0",
      },
    ],
  },
});
