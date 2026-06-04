import { dataSource, type Element } from "@prismatic-io/spectral";
import { getTableuClient } from "../auth";
import { connectionInput } from "../inputs";

export const selectProject = dataSource({
  display: {
    label: "Select Project",
    description: "A picklist of projects in your Tableau site.",
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

    const { data } = await client.get("/projects", {
      params: { pageSize: 1000 },
    });

    const projects = data?.projects?.project ?? [];

    const result: Element[] = (projects as { name: string; id: string }[])
      .map((project) => ({
        label: project.name,
        key: project.id.toString(),
      }))
      .sort((a, b) => (a.label < b.label ? -1 : 1));

    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [{ label: "Default", key: "a1b2c3d4-e5f6-7890-abcd-ef1234567890" }],
  },
});
