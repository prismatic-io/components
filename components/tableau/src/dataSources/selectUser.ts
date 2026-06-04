import { dataSource, type Element } from "@prismatic-io/spectral";
import { getTableuClient } from "../auth";
import { connectionInput } from "../inputs";

export const selectUser = dataSource({
  display: {
    label: "Select User",
    description: "A picklist of users in your Tableau site.",
  },
  inputs: {
    tableauConnection: connectionInput,
  },
  perform: async (_context, { tableauConnection }) => {
    const client = await getTableuClient({
      tableauConnection,
      timeout: 10000,
      debug: false,
    });

    const { data } = await client.get("/users", {
      params: { pageSize: 1000 },
    });

    const users = data?.users?.user ?? [];

    const result: Element[] = (users as { name: string; id: string }[])
      .map((user) => ({
        label: user.name,
        key: user.id.toString(),
      }))
      .sort((a, b) => (a.label < b.label ? -1 : 1));

    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      {
        label: "john.doe@example.com",
        key: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      },
    ],
  },
});
