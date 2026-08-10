import { dataSource } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { DATASOURCE_PAGE_SIZE } from "../constants";
import { selectDepartmentExamplePayload } from "../examplePayloads";
import { selectDepartmentInputs } from "../inputs";
import type { Department } from "../types";
import { mapToElements } from "../util";
export const selectDepartment = dataSource({
  display: {
    label: "Select Department",
    description: "Select a department from Oracle Fusion Cloud HCM.",
  },
  dataSourceType: "picklist",
  inputs: selectDepartmentInputs,
  perform: async (_context, { connection, effectiveDate }) => {
    const client = createClient(connection, false);
    const { data } = await client.get<{
      items: Department[];
    }>("/organizations", {
      params: { limit: DATASOURCE_PAGE_SIZE, onlyData: "true", effectiveDate },
    });
    const result = mapToElements(
      data.items,
      (d) => d.Name,
      (d) => d.OrganizationId,
    );
    return { result };
  },
  examplePayload: selectDepartmentExamplePayload,
});
