import { dataSource, type Element } from "@prismatic-io/spectral";
import { getClient } from "../client";
import { selectEmployeeFieldInputs } from "../inputs";
import type { EmployeeFieldListResponse } from "../types/employeeField";

export const selectEmployeeField = dataSource({
  display: {
    label: "Select Employee Field",
    description: "Select an employee field.",
  },
  inputs: selectEmployeeFieldInputs,
  perform: async (_context, { connection }) => {
    const client = getClient(connection, false);

    const { data } = await client.get<EmployeeFieldListResponse>(
      `/company/people/fields`,
    );

    const result = data.map<Element>(({ id, name }) => ({
      label: name,
      key: id,
    }));
    return { result };
  },
  dataSourceType: "picklist",
});
