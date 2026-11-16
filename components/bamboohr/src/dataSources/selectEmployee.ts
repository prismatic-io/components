import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { ENDPOINTS } from "../constants";
import { createBambooClient } from "../client";
import { selectEmployeeExamplePayload } from "../examplePayloads";
import { selectEmployeeInputs } from "../inputs";
import type { EmployeeDirectoryResponse } from "../types";
import { toEmployeeLabel } from "../util";

export const selectEmployee = dataSource({
  display: {
    label: "Select Employee",
    description: "Select an employee from a list of employees.",
  },
  inputs: selectEmployeeInputs,
  perform: async (_context, { connection }) => {
    const client = createBambooClient(connection, false);
    const { data } = await client.get<EmployeeDirectoryResponse>(
      ENDPOINTS.EMPLOYEES_DIRECTORY,
    );
    const employees = Array.isArray(data.employees) ? data.employees : [];
    const result: Element[] = employees.map((employee) => ({
      label: toEmployeeLabel(employee),
      key: util.types.toString(employee.id),
    }));
    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: selectEmployeeExamplePayload,
});
