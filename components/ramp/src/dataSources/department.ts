import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { departmentDatasource } from "../examplePayloads/datasources";
import { connection } from "../inputs";
import type { Department } from "../interfaces/departments";
import { fetchAllData } from "../util";

export const selectDepartment = dataSource({
  display: {
    label: "Select Department",
    description: "Select a Department from a dropdown menu.",
  },
  inputs: {
    connection,
  },
  perform: async (_context, { connection }) => {
    const client = createClient(connection);
    const { data } = await fetchAllData<Department>(client, "departments", {}, true);

    const objects = data
      .sort((a, b) => (a.id < b.id ? -1 : 1))
      .map<Element>((department) => ({
        key: department.id,
        label: department.name,
      }));

    return { result: objects };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: departmentDatasource,
  },
});
