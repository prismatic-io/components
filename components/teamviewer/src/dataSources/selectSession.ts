import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connection } from "../inputs/general";

interface Session {
  code: string;
  description?: string;
  state?: string;
}

export const selectSession = dataSource({
  display: {
    label: "Select Session",
    description: "Select a session from a dropdown menu.",
  },
  inputs: {
    connection,
  },
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false);

    const { data } = await client.get("/sessions");
    const result = ((data.sessions as Session[]) || []).map<Element>(
      ({ code, description }) => ({
        label: description || code,
        key: code,
      }),
    );
    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [{ label: "string", key: "string" }],
  },
});
