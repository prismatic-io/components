import type { Element } from "@prismatic-io/spectral";
import { dataSource } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectUserExamplePayload as examplePayload } from "../examplePayloads/dataSources";
import { connection } from "../inputs";

export const selectUser = dataSource({
  display: {
    label: "Select User",
    description: "Select a user from a list of users.",
  },
  inputs: { connection },
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false);
    const { data } = await client.get("/users");

    const usersObj = data?.results?.users ?? {};
    const users = Object.values(usersObj) as {
      first_name?: string;
      last_name?: string;
      id?: number;
    }[];

    const result: Element[] = users
      .map((item) => ({
        label: `${item.first_name || ""} ${item.last_name || ""}`.trim() || String(item.id || ""),
        key: String(item.id || ""),
      }))
      .sort((a: Element, b: Element) => (a.label ?? "").localeCompare(b.label ?? ""));

    return { result };
  },
  dataSourceType: "picklist",
  examplePayload,
});
