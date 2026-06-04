import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connectionInput, version } from "../inputs";
import type { DepartmentDataSources } from "../types";

export const departments = dataSource({
  display: {
    label: "Fetch Departments",
    description: "Fetches an array of department names.",
  },
  inputs: {
    connection: connectionInput,
    version,
  },
  perform: async (_context, { connection, version }) => {
    const client = createClient(connection, version);
    const { data } = await client.get<DepartmentDataSources[]>("/departments");
    const result = data.map<Element>((department) => ({
      label: department.name,
      key: department.id.toString(),
    }));
    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      { label: "Technology", key: "650" },
      { label: "Administration", key: "47012" },
    ],
  },
});
