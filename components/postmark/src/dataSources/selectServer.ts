import { dataSource } from "@prismatic-io/spectral";
import type { Element } from "@prismatic-io/spectral";
import { createHttpClient } from "../client";
import { connectionInput } from "../inputs";
import { selectServerExamplePayload as examplePayload } from "../examplePayloads/dataSources";

export const selectServer = dataSource({
  display: {
    label: "Select Server",
    description: "Select a server from a list of servers.",
  },
  inputs: {
    connection: connectionInput,
  },
  perform: async (context, { connection }) => {
    const client = createHttpClient(connection, false, true);
    const { data } = await client.get("/servers?count=500&offset=0");

    const servers = data?.Servers ?? [];

    const result: Element[] = servers
      .map((item: { Name?: string; ID?: number }) => ({
        label: item.Name || String(item.ID) || "",
        key: String(item.ID || ""),
      }))
      .sort((a: Element, b: Element) =>
        (a.label || "").localeCompare(b.label || ""),
      );

    return { result };
  },
  dataSourceType: "picklist",
  examplePayload,
});
