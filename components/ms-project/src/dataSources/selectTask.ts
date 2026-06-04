import type { Element } from "@prismatic-io/spectral";
import { dataSource, util } from "@prismatic-io/spectral";
import { createProjectsClient } from "../client";
import { selectTaskExamplePayload as examplePayload } from "../examplePayloads/dataSources";
import { connection, guId } from "../inputs";

export const selectTask = dataSource({
  display: {
    label: "Select Task",
    description: "Select a task from a list of tasks in a project.",
  },
  inputs: {
    connection,
    guId: {
      ...guId,
      dataSource: undefined,
    },
  },
  perform: async (_context, { connection, guId }) => {
    const client = createProjectsClient({ connection }, false);
    const projectId = util.types.toString(guId);
    const { data } = await client.get(`/Projects('${projectId}')/Tasks`);

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
