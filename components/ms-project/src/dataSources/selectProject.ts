import type { Element } from "@prismatic-io/spectral";
import { dataSource } from "@prismatic-io/spectral";
import { createProjectsClient } from "../client";
import { selectProjectExamplePayload as examplePayload } from "../examplePayloads/dataSources";
import { connection } from "../inputs";

export const selectProject = dataSource({
  display: {
    label: "Select Project",
    description: "Select a project from a list of projects.",
  },
  inputs: {
    connection,
  },
  perform: async (_context, { connection }) => {
    const client = createProjectsClient({ connection }, false);
    const { data } = await client.get("/Projects");

    const items = data?.d?.results ?? data?.results ?? [];

    const result: Element[] = items
      .map((item: { Name?: string; Id?: string }) => ({
        label: item.Name || item.Id || "",
        key: item.Id || "",
      }))
      .sort((a: Element, b: Element) => (a.label ?? "").localeCompare(b.label ?? ""));

    return { result };
  },
  dataSourceType: "picklist",
  examplePayload,
});
