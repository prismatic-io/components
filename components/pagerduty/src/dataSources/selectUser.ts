import { dataSource } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connectionInput } from "../inputs";

export const selectUser = dataSource({
  display: {
    label: "Select User",
    description: "Retrieve and select a user.",
  },
  dataSourceType: "picklist",
  perform: async (context, { connection }) => {
    const client = createClient(connection);
    const {
      data: { users },
    } = await client.get(`/users`);

    return users.map((user: Record<string, unknown>) => ({
      key: user.id,
      label: user.name,
    }));
  },
  inputs: {
    connection: connectionInput,
  },
});
